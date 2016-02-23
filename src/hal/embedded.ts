import {AnyConstructor, projectArray} from '../common/core';

import {HalClient, HalDecoratorTransformation, HalObjectFactory} from './client';
import {withOwnMetadata} from './metadata';
import {HAL_DECORATOR_METADATA_KEY} from './symbols';

export function HalEmbedded<T>(ctor: AnyConstructor<T>): PropertyDecorator {
  return function(target, key): void {
    withOwnMetadata(HAL_DECORATOR_METADATA_KEY, target, [], (transformations: HalDecoratorTransformation[]) => {
      transformations.push({
        apply: (instance, object, client) => {
          let embeddedObjects = object.embedded.get(key);

          if (!embeddedObjects) {
            return;
          }

          let embeddedInstances = embeddedObjects.map(new HalObjectFactory(ctor, client).from);
          let type = Reflect.getOwnMetadata('design:type', target, key);
          instance[key] = projectArray(embeddedInstances, type);
        }
      });

      return transformations;
    });
  };
}

