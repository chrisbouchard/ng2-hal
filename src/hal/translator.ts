import {OpaqueToken, Type} from 'angular2/core';
import {HalObject} from './object';

export interface HalTranslator {
  appliesTo(ctor: Type): boolean;
}

export interface HalObjectTranslator extends HalTranslator {
  toObject(value: any, ctor: Type): any;
  fromObject(object: any, ctor: Type): any;
}

export interface HalCollectionTranslator extends HalTranslator {
  toArray(value: any, ctor: Type): any[];
  fromArray(array: any[], ctor: Type): any;
}

export const HAL_OBJECT_TRANSLATORS = new OpaqueToken('halObjectTranslators');
export const HAL_COLLECTION_TRANSLATORS = new OpaqueToken('halCollectionTranslators');

