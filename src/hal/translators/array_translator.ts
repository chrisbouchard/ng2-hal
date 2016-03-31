import {AnyConstructor} from '../../common/core';

import {HalObject} from '../object';
import {HalCollectionTranslator} from '../translator';

/**
 * A translator that simply returns the value as given.
 */
export class HalArrayTranslator implements HalCollectionTranslator {

  /**
   * Only apply when we've reached the bottom of the prototype chain.
   */
  appliesTo(ctor: AnyConstructor<any>): boolean {
    return ctor === Array;
  }

  toArray(value: any, ctor: AnyConstructor<any>): any[] {
    if (Array.isArray(value)) {
      return value;
    }

    throw new TypeError(`Expected value of type Array, but got ${value.constructor.name}`);
  }

  fromArray(value: any[], ctor: AnyConstructor<any>): any {
    return value;
  }

}


