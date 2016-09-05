"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
const core_1 = require('@angular/core');
const field_1 = require('./field');
const object_1 = require('./object');
const translator_1 = require('./translator');
let HalInstanceFactory = class HalInstanceFactory {
    constructor(collectionTranslators, objectTranslators) {
        this.collectionTranslators = collectionTranslators;
        this.objectTranslators = objectTranslators;
    }
    createInstance(value, typeDescription, resourceFactory) {
        /* If the field is a collection... */
        if (typeDescription.collection) {
            /* The value must be an array. */
            if (!Array.isArray(value)) {
                throw new TypeError('Expected an array, but did not get one.');
            }
            else {
                /* Create instance of all the elements. */
                const elementTypeDescription = typeDescription.getElementTypeDescription();
                const instanceArray = value.map((element) => this.createInstance(element, elementTypeDescription, resourceFactory));
                /* Then translate the array into a collection instance. */
                return findApplicableCollectionTranslator(this.collectionTranslators, typeDescription.collection)
                    .fromArray(instanceArray, typeDescription.collection);
            }
        }
        else if (Array.isArray(typeDescription.type)) {
            /* The value must be an array. */
            if (!Array.isArray(value)) {
                throw new TypeError('Expected an array, but did not get one.');
            }
            else {
                /* Create instances for each value using the corresponding tuple type to build a type descriptor. */
                return Array.from(wu.zipWith((element, elementType) => this.createInstance(element, new field_1.HalFieldTypeDescription(elementType), resourceFactory), value, typeDescription.type));
            }
        }
        else if (value instanceof object_1.HalObject) {
            /* Get the instance's type from the type description if present, otherwise use the type of the HAL object's
             * resource. We already handled tuple types, so it must be a constructor. */
            const type = typeDescription.type || value.resource.constructor;
            /* This is where we'll build the object we send to the translator. */
            const rawInstance = {};
            /* Copy fields from the links and embedded sections, then all other fields. The order matters -- fields in later
             * sections will overwrite earlier sections. */
            this.fillInstance(rawInstance, value.links, type, field_1.HalFieldSection.LINKS, resourceFactory);
            this.fillInstance(rawInstance, value.embedded, type, field_1.HalFieldSection.EMBEDDED, resourceFactory);
            this.fillInstance(rawInstance, value.resource, type, field_1.HalFieldSection.RESOURCE, resourceFactory);
            /* Translate the raw instance into a cooked instance. */
            return findApplicableObjectTranslator(this.objectTranslators, type).fromObject(rawInstance, type);
        }
        else if (value instanceof object_1.HalLinkObject) {
            return resourceFactory.createResource(value, typeDescription);
        }
        else if (typeof value === 'object') {
            /* Get the instance's type from the type description if present, otherwise use the type of the HAL object's
             * resource. We already handled tuple types, so it must be a constructor. */
            const type = typeDescription.type || value.constructor;
            /* This is where we'll build the object we send to the translator. */
            const rawInstance = {};
            /* Copy fields from the value. We treat all the fields as if they were in the resource section. */
            this.fillInstance(rawInstance, value, type, field_1.HalFieldSection.RESOURCE, resourceFactory);
            /* Translate the raw instance into a cooked instance. */
            return findApplicableObjectTranslator(this.objectTranslators, type).fromObject(rawInstance, type);
        }
        else {
            /* Just return it. */
            return value;
        }
    }
    fillInstance(target, source, type, section, resourceFactory) {
        for (let [key, value] of Object.entries(source)) {
            /* Look up a field description using the raw name. */
            const fieldDescription = field_1.getRawFieldDescription(type, key);
            /* If the field belongs in this section... */
            if (fieldDescription.section === section) {
                /* Create an instance from the value, then assign it using the cooked name. */
                /* TODO: Should we throw an exception if a field is reassigned? */
                target[fieldDescription.cookedName] =
                    this.createInstance(value, fieldDescription.typeDescription, resourceFactory);
            }
        }
    }
};
HalInstanceFactory = __decorate([
    core_1.Injectable(),
    __param(0, core_1.Inject(translator_1.HAL_COLLECTION_TRANSLATORS)),
    __param(1, core_1.Inject(translator_1.HAL_OBJECT_TRANSLATORS)), 
    __metadata('design:paramtypes', [Array, Array])
], HalInstanceFactory);
exports.HalInstanceFactory = HalInstanceFactory;
function findApplicableCollectionTranslator(translators, type) {
    try {
        return findApplicableTranslator(translators, type);
    }
    catch (ex) {
        throw Object.create(ex, {
            message: `Error finding an applicable collection translator: ${ex.message}`
        });
    }
}
function findApplicableObjectTranslator(translators, type) {
    try {
        return findApplicableTranslator(translators, type);
    }
    catch (ex) {
        throw Object.create(ex, {
            message: `Error finding an applicable object translator: ${ex.message}`
        });
    }
}
function findApplicableTranslator(translators, ctor) {
    let currentPrototype = ctor ? ctor.prototype : undefined;
    let currentCtor = ctor;
    while (true) {
        const applicable = translators.filter(translator => translator.appliesTo(currentCtor));
        /* If we find multiple translators applicable to the same type, we have no way to choose among them. So we just
         * throw an exception. */
        if (applicable.length > 1) {
            throw new TypeError(`Multiple translators found for type ${currentCtor} while finding translators for type ${ctor}.`);
        }
        /* If we find exactly one translator, we can return it. */
        if (applicable.length === 1) {
            return applicable[0];
        }
        /* Once we're reached the bottom of the prototype chain, we need to stop looking. */
        if (!currentCtor) {
            break;
        }
        /* Otherwise we should try using our prototype's constructor (if we have a prototype), or else undefined. */
        if (currentPrototype) {
            currentCtor = currentPrototype.constructor;
            currentPrototype = Object.getPrototypeOf(currentPrototype);
        }
        else {
            currentCtor = undefined;
        }
    }
    /* If we get out of the loop, we walked all the way down the prototype chain and didn't find any applicable
     * translators. Give up and throw an exception. */
    throw new TypeError(`No translators found for type ${ctor}.`);
}
//# sourceMappingURL=instance-factory.js.map