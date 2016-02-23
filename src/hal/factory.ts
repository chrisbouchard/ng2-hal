import {AnyConstructor} from '../common/core';

import {HAL_FACTORY_METADATA_KEY} from './symbols';

export interface HalFactoryMethod {
  (json: any): any;
}

export function HalFactory(target: any, key?: string | symbol, description?: TypedPropertyDescriptor<any>): void {
  let method: HalFactoryMethod;

  if (key) {
    method = (json: any) => target[key](json);
  }
  else {
    let ctor = target as AnyConstructor<any>;
    method = (json: any) => new ctor(json);
  }

  Reflect.defineMetadata(HAL_FACTORY_METADATA_KEY, method, target);
}

