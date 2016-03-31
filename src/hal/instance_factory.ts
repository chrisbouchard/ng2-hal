import {Inject, Injectable} from 'angular2/core';
import * as wu from 'wu';

import {AnyConstructor} from '../common/core';

import {getCookedFieldDescription, getRawFieldDescription, HalFieldDescription, HalFieldSection, HalFieldTypeDescription} from './field';
import {HalLinkObject, HalObject, HalObjectSerializer} from './object';
import {HalResource} from './resource';
import {HalResourceFactory} from './resource_factory';
import {HalCollectionTranslator, HAL_COLLECTION_TRANSLATORS, HalObjectTranslator, HAL_OBJECT_TRANSLATORS,
  HalTranslator} from './translator';

@Injectable()
export class HalInstanceFactory {

  constructor(
    @Inject(HAL_COLLECTION_TRANSLATORS) private collectionTranslators: HalCollectionTranslator[],
    @Inject(HAL_OBJECT_TRANSLATORS) private objectTranslators: HalObjectTranslator[]
  ) {}

  createInstance(value: any, typeDescription: HalFieldTypeDescription, resourceFactory: HalResourceFactory): any {
    /* If the field is a collection... */
    if (typeDescription.collection) {
      /* The value must be an array. */
      if (!Array.isArray(value)) {
        throw new TypeError('Expected an array, but did not get one.');
      }
      else {
        /* Create instance of all the elements. */
        const elementTypeDescription = typeDescription.getElementTypeDescription();
        const instanceArray = value.map(element => this.createInstance(element, elementTypeDescription, resourceFactory));

        /* Then translate the array into a collection instance. */
        return findApplicableCollectionTranslator(this.collectionTranslators, typeDescription.collection)
            .fromArray(instanceArray, typeDescription.collection);
      }
    }

    /* If the field is a tuple... */
    else if (Array.isArray(typeDescription.type)) {
      /* The value must be an array. */
      if (!Array.isArray(value)) {
        throw new TypeError('Expected an array, but did not get one.');
      }
      else {
        /* Create instances for each value using the corresponding tuple type to build a type descriptor. */
        return Array.from(wu.zipWith(
          (element, elementCtor) => this.createInstance(element, new HalFieldTypeDescription(elementCtor), resourceFactory),
          value, typeDescription.type
        );
      }
    }

    /* If the value is a HAL object (most likely a top-level resource or embedded resource)... */
    else if (value instanceof HalObject) {
      /* Get the instance's type from the type description if present, otherwise use the type of the HAL object's
       * resource. We already handled tuple types, so it must be a constructor. */
      const ctor = typeDescription.type || value.resource.constructor;

      /* This is where we'll build the object we send to the translator. */
      const rawInstance = {};

      /* Copy fields from the links and embedded sections, then all other fields. The order matters -- fields in later
       * sections will overwrite earlier sections. */
      this.fillInstance(rawInstance, value.links, ctor, HalFieldSection.LINKS);
      this.fillInstance(rawInstance, value.embedded, ctor, HalFieldSection.EMBEDDED);
      this.fillInstance(rawInstance, value.resource, ctor, HalFieldSection.RESOURCE);

      /* Translate the raw instance into a cooked instance. */
      return findApplicableObjectTranslator(this.objectTranslators, ctor).fromObject(rawInstance, ctor);
    }

    /* If the value is a HAL link... */
    else if (value instanceof HalLinkObject) {
      return this.resourceFactory.createResource(value, typeDescription);
    }

    /* If the value is anything else... */
    else {
      /* Get the instance's type from the type description if present, otherwise use the type of the HAL object's
       * resource. We already handled tuple types, so it must be a constructor. */
      const ctor = typeDescription.type || value.constructor;

      /* This is where we'll build the object we send to the translator. */
      const rawInstance = {};

      /* Copy fields from the value. We treat all the fields as if they were in the resource section. */
      this.fillInstance(rawInstance, value, ctor, HalFieldSection.RESOURCE);

      /* Translate the raw instance into a cooked instance. */
      return findApplicableObjectTranslator(this.objectTranslators, ctor).fromObject(rawInstance, ctor);
    }
  }

  private fillInstance(target: any, source: any, ctor: AnyConstructor<any>, section: HalFieldSection,
      resourceFactory: HalResourceFactory): void {
    for ([key, value] of Object.entries(source)) {
      /* Look up a field description using the raw name. */
      const fieldDescription = getRawFieldDescription(ctor, key);

      /* If the field belongs in this section... */
      if (fieldDescription.section === section) {
        /* Create an instance from the value, then assign it using the cooked name. */
        /* TODO: Should we throw an exception if a field is reassigned? */
        target[fieldDescription.cookedName] = this.createInstance(value, fieldDescription.typeDescription, resourceFactory);
      }
    }
  }

}


function findApplicableCollectionTranslator(translators: HalCollectionTranslator[], ctor: AnyConstructor<any>): HalCollectionTranslator {
  try {
    return findApplicableTranslator(translators, ctor);
  }
  catch (ex) {
    if (ex instanceof TypeError) {
      throw new TypeError(`Error finding an applicable collection translator: ${ex.message}`);
    }

    throw ex;
  }
}

function findApplicableObjectTranslator(translators: HalObjectTranslator[], ctor: AnyConstructor<any>): HalObjectTranslator {
  try {
    return findApplicableTranslator(translators, ctor);
  }
  catch (ex) {
    if (ex instanceof TypeError) {
      throw new TypeError(`Error finding an applicable object translator: ${ex.message}`);
    }

    throw ex;
  }
}

function findApplicableTranslator<T extends HalTranslator>(translators: T[], ctor: AnyConstructor<any>): T {
  let currentCtor = ctor;

  while (true) {
    const applicable = translators.filter(translator => translator.appliesTo(currentCtor));

    /* If we find multiple translators applicable to the same type, we have no way to choose among them. So we just
     * throw an exception. */
    if (applicable.length > 1) {
      throw new TypeError(`Multiple translators found for type ${currentCtor} while finding translators for type ${ctor}.`);
    }

    /* If we find exactly one translator, we can return it. */
    if (applicable.length == 1) {
      return applicable[0];
    }

    /* Once we're reached the bottom of the prototype chain, we need to stop looking. */
    if (!currentCtor) {
      break;
    }

    /* Otherwise we should try using our prototype's constructor (if we have a prototype), or else undefined. */
    const prototype: any = ctor.prototype;
    currentCtor = prototype ? prototype.constructor : undefined;
  }

  /* If we get out of the loop, we walked all the way down the prototype chain and didn't find any applicable
   * translators. Give up and throw an exception. */
  throw new TypeError(`No translators found for type ${ctor}.`);
}

