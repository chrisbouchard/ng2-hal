import {Type} from 'angular2/core';

import {HalObject} from '../object';
import {HalObjectTranslator} from '../translator';

/**
 * A translator that simply returns the value as given.
 */
export class HalDefaultObjectTranslator implements HalObjectTranslator {

  /**
   * Only apply when we've reached the bottom of the prototype chain.
   */
  appliesTo(ctor: Type): boolean {
    return !ctor;
  }

  toObject(value: any, ctor: Type): any {
    const instance: any = {};
    Object.assign(instance, value);
    return instance;
  }

  fromObject(value: any, ctor: Type): any {
    const instance: any = Reflect.construct(ctor, []);
    Object.assign(instance, value);
    return instance;
  }

}

