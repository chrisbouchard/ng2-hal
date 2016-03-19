import {AnyConstructor, projectArray} from '../common/core';
import {withOwnMetadata} from '../common/metadata';

import {HalClient, HalDecoratorTransformation, HalObjectFactory} from './client';
import {HAL_DECORATOR_METADATA_KEY} from './symbols';
import {HalObject} from './object';

export function HalEmbedded<T>(ctor: AnyConstructor<T>): PropertyDecorator {
  return (target, key) =>
    withOwnMetadata(HAL_DECORATOR_METADATA_KEY, target, [], (transformations: HalDecoratorTransformation[]) => {
      transformations.push({
        apply(instance: any, object: HalObject, client: HalClient): void {
          const embeddedObjects = object.embedded.get(key);

          if (!embeddedObjects) {
            return;
          }

          const embeddedInstances = embeddedObjects.map(new HalObjectFactory(ctor, client).from);
          const type = Reflect.getOwnMetadata('design:type', target, key);
          instance[key] = projectArray(embeddedInstances, type);
        }
      });

      return transformations;
    });
}

