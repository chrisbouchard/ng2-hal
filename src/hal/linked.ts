import {AnyConstructor} from '../common/core';

import {getMetadataPropertyMap} from './metadata';
import {HAL_EMBEDDED_METADATA_KEY} from './symbols';

export function HalLinked(ctor: AnyConstructor<T>): PropertyDecorator {
  return function(target, key): void {
    getMetadataPropertyMap<AnyConstructor<T>>(HAL_LINKS_METADATA_KEY, target).set(key, ctor);
  };
}

