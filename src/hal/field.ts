import {AnyConstructor} from '../common/core';
import {withOwnMetadata} from '../common/metadata';

import {HAL_FIELD_METADATA_KEY} from './symbols';

export interface HalFieldMetadata {
  name?: string;
  constructorFn?: AnyConstructor<any>;
  factory?: Function;
}

export class HalFieldMapping {
  constructor(public fieldName: string | symbol, public metadata: HalFieldMetadata) {};
}

export function HalField(metadata: HalFieldMetadata): PropertyDecorator {
  return (target, key) => {
    withOwnMetadata<Map<string | symbol, HalFieldMapping>>(HAL_FIELD_METADATA_KEY, target, new Map(), map => {
      let jsonName = metadata.name || key;
      map.set(jsonName, new HalFieldMapping(key, metadata));
      return map;
    });
  };
}

