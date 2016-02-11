import {HAL_FACTORY_METADATA_KEY} from './symbols';

export interface HalFactoryMethod<T> {
  (json: any): T;
}

export enum HalFactoryType {
  CONSTRUCTOR, METHOD
}

export class HalFactoryMetadata {
  constructor(public type: HalFactoryType, public method?: string | symbol) {}
}


export function HalFactory<TFunction extends Function>(target: TFunction, key?: string | symbol,
    description?: TypedPropertyDescriptor<any>): void {
  let metadata: HalFactoryMetadata;

  if (key) {
    metadata = new HalFactoryMetadata(HalFactoryType.METHOD, key);
  }
  else {
    metadata = new HalFactoryMetadata(HalFactoryType.CONSTRUCTOR);
  }

  Reflect.defineMetadata(HAL_FACTORY_METADATA_KEY, metadata, target);
}

