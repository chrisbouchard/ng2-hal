"use strict";
const HAL_COOKED_FIELD_METADATA_KEY = Symbol('halCookedFieldMetadataKey');
const HAL_RAW_FIELD_METADATA_KEY = Symbol('halRawFieldMetadataKey');
(function (HalFieldSection) {
    HalFieldSection[HalFieldSection["EMBEDDED"] = 0] = "EMBEDDED";
    HalFieldSection[HalFieldSection["LINKS"] = 1] = "LINKS";
    HalFieldSection[HalFieldSection["RESOURCE"] = 2] = "RESOURCE";
})(exports.HalFieldSection || (exports.HalFieldSection = {}));
var HalFieldSection = exports.HalFieldSection;
class HalFieldDescription {
    constructor(key, arg) {
        this.section = HalFieldSection.RESOURCE;
        this.rawName = key;
        this.cookedName = key;
        if (arg instanceof String) {
            this.rawName = arg;
            this.typeDescription = new HalFieldTypeDescription({});
        }
        else if (arg instanceof Function) {
            this.typeDescription = new HalFieldTypeDescription(arg);
        }
        else {
            let metadata = arg || {};
            if (metadata.name !== undefined) {
                this.rawName = metadata.name;
            }
            if (metadata.section !== undefined) {
                this.section = metadata.section;
            }
            this.typeDescription = new HalFieldTypeDescription(metadata);
        }
    }
}
exports.HalFieldDescription = HalFieldDescription;
class HalFieldTypeDescription {
    constructor(arg) {
        if (arg instanceof Function) {
            this.type = arg;
        }
        else {
            let metadata = arg || {};
            this.type = metadata.type;
            this.collection = metadata.collection;
        }
    }
    getElementTypeDescription() {
        if (!this.collection) {
            throw new TypeError('This HalFieldTypeDescription does not describe a collection.');
        }
        return new HalFieldTypeDescription({
            type: this.type
        });
    }
}
exports.HalFieldTypeDescription = HalFieldTypeDescription;
function HalField(arg) {
    return (target, key) => {
        if (typeof key === 'string') {
            let description = new HalFieldDescription(key, arg);
            defineDescriptionMetadata(description, target);
        }
        else {
            throw new TypeError('The @HalField decorator can only be applied to a field whose name is a String');
        }
    };
}
exports.HalField = HalField;
function HalEmbedded(arg) {
    return (target, key) => {
        if (typeof key === 'string') {
            let description = new HalFieldDescription(key, arg);
            description.section = HalFieldSection.EMBEDDED;
            defineDescriptionMetadata(description, target);
        }
        else {
            throw new TypeError('The @HalEmbedded decorator can only be applied to a field whose name is a String');
        }
    };
}
exports.HalEmbedded = HalEmbedded;
function HalLink(arg) {
    return (target, key) => {
        if (typeof key === 'string') {
            let description = new HalFieldDescription(key, arg);
            description.section = HalFieldSection.LINKS;
            defineDescriptionMetadata(description, target);
        }
        else {
            throw new TypeError('The @HalLink decorator can only be applied to a field whose name is a String');
        }
    };
}
exports.HalLink = HalLink;
function defineDescriptionMetadata(description, target) {
    Reflect.defineMetadata(HAL_COOKED_FIELD_METADATA_KEY, description, target.constructor, description.cookedName);
    Reflect.defineMetadata(HAL_RAW_FIELD_METADATA_KEY, description, target.constructor, description.rawName);
}
function getCookedFieldDescription(target, key) {
    return Reflect.getMetadata(HAL_COOKED_FIELD_METADATA_KEY, target, key) || new HalFieldDescription(key, undefined);
}
exports.getCookedFieldDescription = getCookedFieldDescription;
function getRawFieldDescription(target, key) {
    return Reflect.getMetadata(HAL_RAW_FIELD_METADATA_KEY, target, key) || new HalFieldDescription(key, undefined);
}
exports.getRawFieldDescription = getRawFieldDescription;
//# sourceMappingURL=field.js.map