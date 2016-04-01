import {Type} from 'angular2/core';

import {HalObject} from '../object';
import {HalCollectionTranslator} from '../translator';

/**
 * A translator that simply returns the value as given.
 */
export class HalArrayTranslator implements HalCollectionTranslator {

  /**
   * Only apply when we've reached the bottom of the prototype chain.
   */
  appliesTo(ctor: Type): boolean {
    return ctor === Array;
  }

  toArray(value: any, ctor: Type): any[] {
    if (Array.isArray(value)) {
      return value;
    }

    throw new TypeError(`Expected value of type Array, but got ${value.constructor.name}`);
  }

  fromArray(value: any[], ctor: Type): any {
    return value;
  }

}


