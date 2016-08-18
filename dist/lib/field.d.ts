import { Type } from '@angular/core';
export declare enum HalFieldSection {
    EMBEDDED = 0,
    LINKS = 1,
    RESOURCE = 2,
}
export interface HalFieldTypeMetadata {
    type?: Type | Type[];
    collection?: Type;
}
export interface HalFieldMetadata extends HalFieldTypeMetadata {
    name?: string;
    section?: HalFieldSection;
}
export declare class HalFieldDescription {
    rawName: string;
    cookedName: string;
    typeDescription: HalFieldTypeDescription;
    section: HalFieldSection;
    constructor(key: string, arg: string | Type | HalFieldMetadata);
}
export declare class HalFieldTypeDescription {
    type: Type | Type[];
    collection: Type;
    constructor(arg: Type | HalFieldTypeMetadata);
    getElementTypeDescription(): HalFieldTypeDescription;
}
export declare function HalField(arg: string | Type | HalFieldMetadata): PropertyDecorator;
export declare function HalEmbedded(arg: string | Type | HalFieldMetadata): PropertyDecorator;
export declare function HalLink(arg: string | Type | HalFieldMetadata): PropertyDecorator;
export declare function getCookedFieldDescription(target: any, key: string): HalFieldDescription;
export declare function getRawFieldDescription(target: any, key: string): HalFieldDescription;
