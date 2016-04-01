import {AnyConstructor} from '../../common/core';

import {HalObject} from '../object';
import {HalObjectTranslator} from '../translator';

/**
 * A translator that simply returns the value as given.
 */
export class HalDefaultObjectTranslator implements HalObjectTranslator {

  /**
   * Only apply when we've reached the bottom of the prototype chain.
   */
  appliesTo(ctor: AnyConstructor<any>): boolean {
    return !ctor;
  }

  toObject(value: any, ctor: AnyConstructor<any>): any {
    const instance: any = {};
    Object.assign(instance, value);
    return instance;
  }

  fromObject(value: any, ctor: AnyConstructor<any>): any {
    const instance: any = new ctor();
    Object.assign(instance, value);
    return instance;
  }

}

