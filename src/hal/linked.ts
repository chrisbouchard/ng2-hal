import {AnyConstructor, projectArray} from '../common/core';

import {HalClient, HalDecoratorTransformation, HalLinkFactory} from './client';
import {withOwnMetadata} from './metadata';
import {HAL_DECORATOR_METADATA_KEY} from './symbols';

export function HalLinked<T>(ctor: AnyConstructor<T>): PropertyDecorator {
  return function(target, key): void {
    withOwnMetadata(HAL_DECORATOR_METADATA_KEY, target, [], (transformations: HalDecoratorTransformation[]) => {
      transformations.push({
        apply: (instance, object, client) => {
          let linkedObjects = object.links.get(key);

          if (!linkedObjects) {
            return;
          }

          let linkedInstances = linkedObjects.map(new HalLinkFactory(ctor, client).from);
          let type = Reflect.getOwnMetadata('design:type', target, key);
          instance[key] = projectArray(linkedInstances, type);
        }
      });

      return transformations;
    });
  };
}

