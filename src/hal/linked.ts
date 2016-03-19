import {AnyConstructor, projectArray} from '../common/core';
import {withOwnMetadata} from '../common/metadata';

import {HalClient, HalDecoratorTransformation, HalLinkFactory} from './client';
import {HAL_DECORATOR_METADATA_KEY} from './symbols';
import {HalObject} from './object';

export function HalLinked<T>(ctor: AnyConstructor<T>): PropertyDecorator {
  return (target, key) =>
    withOwnMetadata(HAL_DECORATOR_METADATA_KEY, target, [], (transformations: HalDecoratorTransformation[]) => {
      transformations.push({
        apply(instance: any, object: HalObject, client: HalClient): void {
          const linkedObjects = object.links.get(key);

          if (!linkedObjects) {
            return;
          }

          const linkedInstances = linkedObjects.map(new HalLinkFactory(ctor, client).from);
          const type = Reflect.getOwnMetadata('design:type', target, key);
          instance[key] = projectArray(linkedInstances, type);
        }
      });

      return transformations;
    });
}

