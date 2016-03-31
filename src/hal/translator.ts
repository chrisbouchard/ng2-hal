import {OpaqueToken} from 'angular2/core';
import {AnyConstructor} from '../common/core';
import {HalObject} from './object';

export interface HalTranslator {
  appliesTo(ctor: AnyConstructor<any>): boolean;
}

export interface HalObjectTranslator extends HalTranslator {
  toObject<T>(value: T, ctor: AnyConstructor<T>): any;
  fromObject<T>(object: any, ctor: AnyConstructor<T>): T;
}

export interface HalCollectionTranslator extends HalTranslator {
  toArray<T>(value: T, ctor: AnyConstructor<T>): any[];
  fromArray<T>(array: any[], ctor: AnyConstructor<T>): T;
}

export const HAL_OBJECT_TRANSLATORS = new OpaqueToken('halObjectTranslators');
export const HAL_COLLECTION_TRANSLATORS = new OpaqueToken('halCollectionTranslators');

