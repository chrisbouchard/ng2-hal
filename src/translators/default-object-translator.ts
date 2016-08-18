import { Type } from '@angular/core';

import { HalObject } from '../object';
import { HalObjectTranslator } from '../translator';

/**
 * A translator that simply returns the value as given.
 */
export class HalDefaultObjectTranslator implements HalObjectTranslator {

  /**
   * Only apply when we've reached the bottom of the prototype chain.
   */
  appliesTo(type: Type): boolean {
    return !type;
  }

  toObject(value: any, type: Type): any {
    const instance: any = {};
    Object.assign(instance, value);
    return instance;
  }

  fromObject(value: any, type: Type): any {
    const instance: any = Reflect.construct(type, []);
    Object.assign(instance, value);
    return instance;
  }

}

