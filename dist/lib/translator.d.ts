import { OpaqueToken, Type } from '@angular/core';
export interface HalTranslator {
    appliesTo(type: Type): boolean;
}
export interface HalObjectTranslator extends HalTranslator {
    toObject(value: any, type: Type): any;
    fromObject(object: any, type: Type): any;
}
export interface HalCollectionTranslator extends HalTranslator {
    toArray(value: any, type: Type): any[];
    fromArray(array: any[], type: Type): any;
}
export declare const HAL_OBJECT_TRANSLATORS: OpaqueToken;
export declare const HAL_COLLECTION_TRANSLATORS: OpaqueToken;
