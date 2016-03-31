import {OpaqueToken} from 'angular2/core';
import {AnyConstructor} from '../common/core';
import {HalObject} from './object';

export interface HalTranslator {
  appliesTo(ctor: AnyConstructor<any>): boolean;
}

export interface HalObjectTranslator extends HalTranslator {
  toObject(value: any, ctor: AnyConstructor<any>): any;
  fromObject(object: any, ctor: AnyConstructor<any>): any;
}

export interface HalCollectionTranslator extends HalTranslator {
  toArray(value: any, ctor: AnyConstructor<any>): any[];
  fromArray(array: any[], ctor: AnyConstructor<any>): any;
}

export const HAL_OBJECT_TRANSLATORS = new OpaqueToken('halObjectTranslators');
export const HAL_COLLECTION_TRANSLATORS = new OpaqueToken('halCollectionTranslators');

