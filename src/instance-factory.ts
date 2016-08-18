import { Inject, Injectable, Type } from '@angular/core';

import { getCookedFieldDescription, getRawFieldDescription, HalFieldDescription, HalFieldSection,
  HalFieldTypeDescription } from './field';
import { HalLinkObject, HalObject, HalObjectSerializer } from './object';
import { HalResource } from './resource';
import { HalResourceFactory } from './resource-factory';
import { HAL_COLLECTION_TRANSLATORS, HAL_OBJECT_TRANSLATORS, HalCollectionTranslator, HalObjectTranslator,
  HalTranslator } from './translator';

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
        const instanceArray = value.map(
          (element: any) => this.createInstance(element, elementTypeDescription, resourceFactory)
        );

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
          (element: any, elementType: Type) =>
            this.createInstance(element, new HalFieldTypeDescription(elementType), resourceFactory),
          value, typeDescription.type
        ));
      }
    }

    /* If the value is a HAL object (most likely a top-level resource or embedded resource)... */
    else if (value instanceof HalObject) {
      /* Get the instance's type from the type description if present, otherwise use the type of the HAL object's
       * resource. We already handled tuple types, so it must be a constructor. */
      const type = typeDescription.type || value.resource.constructor;

      /* This is where we'll build the object we send to the translator. */
      const rawInstance = {};

      /* Copy fields from the links and embedded sections, then all other fields. The order matters -- fields in later
       * sections will overwrite earlier sections. */
      this.fillInstance(rawInstance, value.links, type, HalFieldSection.LINKS, resourceFactory);
      this.fillInstance(rawInstance, value.embedded, type, HalFieldSection.EMBEDDED, resourceFactory);
      this.fillInstance(rawInstance, value.resource, type, HalFieldSection.RESOURCE, resourceFactory);

      /* Translate the raw instance into a cooked instance. */
      return findApplicableObjectTranslator(this.objectTranslators, type).fromObject(rawInstance, type);
    }

    /* If the value is a HAL link... */
    else if (value instanceof HalLinkObject) {
      return resourceFactory.createResource(value, typeDescription);
    }

    /* If the value is any other kind of object... */
    else if (typeof value === 'object') {
      /* Get the instance's type from the type description if present, otherwise use the type of the HAL object's
       * resource. We already handled tuple types, so it must be a constructor. */
      const type = typeDescription.type || value.constructor;

      /* This is where we'll build the object we send to the translator. */
      const rawInstance = {};

      /* Copy fields from the value. We treat all the fields as if they were in the resource section. */
      this.fillInstance(rawInstance, value, type, HalFieldSection.RESOURCE, resourceFactory);

      /* Translate the raw instance into a cooked instance. */
      return findApplicableObjectTranslator(this.objectTranslators, type).fromObject(rawInstance, type);
    }

    /* If the value is anything else... */
    else {
      /* Just return it. */
      return value;
    }
  }

  private fillInstance(target: any, source: any, type: Type, section: HalFieldSection,
      resourceFactory: HalResourceFactory): void {
    for (let [key, value] of Object.entries(source)) {
      /* Look up a field description using the raw name. */
      const fieldDescription = getRawFieldDescription(type, key);

      /* If the field belongs in this section... */
      if (fieldDescription.section === section) {
        /* Create an instance from the value, then assign it using the cooked name. */
        /* TODO: Should we throw an exception if a field is reassigned? */
        target[fieldDescription.cookedName] =
          this.createInstance(value, fieldDescription.typeDescription, resourceFactory);
      }
    }
  }

}


function findApplicableCollectionTranslator(translators: HalCollectionTranslator[], type: Type): HalCollectionTranslator {
  try {
    return findApplicableTranslator(translators, type);
  }
  catch (ex) {
    throw Object.create(ex, {
      message: `Error finding an applicable collection translator: ${ex.message}`
    });
  }
}

function findApplicableObjectTranslator(translators: HalObjectTranslator[], type: Type): HalObjectTranslator {
  try {
    return findApplicableTranslator(translators, type);
  }
  catch (ex) {
    throw Object.create(ex, {
      message: `Error finding an applicable object translator: ${ex.message}`
    });
  }
}

function findApplicableTranslator<T extends HalTranslator>(translators: T[], ctor: Type): T {
  let currentPrototype: any = ctor ? ctor.prototype : undefined;
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

