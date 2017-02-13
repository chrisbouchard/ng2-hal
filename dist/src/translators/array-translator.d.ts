import { Type } from '@angular/core';
import { HalCollectionTranslator } from '../translator';
/**
 * A translator that simply returns the value as given.
 */
export declare class HalArrayTranslator implements HalCollectionTranslator {
    /**
     * Only apply when we've reached the bottom of the prototype chain.
     */
    appliesTo(type: Type<any>): boolean;
    toArray(value: any, type: Type<any>): any[];
    fromArray(value: any[], type: Type<any>): any;
}
