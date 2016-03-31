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

  toArray<T>(value: T, ctor: AnyConstructor<T>): any[] {
    return value;
  }

  fromArray<T>(value: any[], ctor: AnyConstructor<T>): T {
    return value;
  }

}


