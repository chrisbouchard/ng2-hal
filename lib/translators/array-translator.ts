import { Type } from '@angular/core';

import { HalObject } from '../object';
import { HalCollectionTranslator } from '../translator';

/**
 * A translator that simply returns the value as given.
 */
export class HalArrayTranslator implements HalCollectionTranslator {

  /**
   * Only apply when we've reached the bottom of the prototype chain.
   */
  appliesTo(type: Type): boolean {
    return type === Array;
  }

  toArray(value: any, type: Type): any[] {
    if (Array.isArray(value)) {
      return value;
    }

    throw new TypeError(`Expected value of type Array, but got ${value.construtype.name}`);
  }

  fromArray(value: any[], type: Type): any {
    return value;
  }

}


