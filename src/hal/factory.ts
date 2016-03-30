import {construct, IdentifierType} from '../common/core';

const HAL_FACTORY_METADATA_KEY = Symbol('halFactoryMetadataKey');

export class HalFactoryMetadata {
  factory: Function;
}

export class HalFactoryDescription {
  public factory: Function;
}

export function HalFactory(metadata?: HalFactoryMetadata): ClassDecorator & MethodDecorator {
  return (target, key?, description?) => {
    let description: HalFactoryDescription = new HalFactoryDescription();

    if (key) {
      if (metadata && metadata.factory) {
        throw new TypeError('HalFactory cannot be used as a method decorator when a factory function is specified.');
      }

      description.factory = target[key].bind(target);
    }
    else {
      if (metadata && metadata.factory) {
        description.factory = metadata.factory;
      }
      else {
        description.factory = construct(target);
      }
    }

    Reflect.defineMetadata(HAL_FACTORY_METADATA_KEY, description, target);
  };
}

export function getOwnFactoryDescription(target: any): HalFactoryDescription {
  return Reflect.getOwnMetadata(HAL_FACTORY_METADATA_KEY, target);
}

