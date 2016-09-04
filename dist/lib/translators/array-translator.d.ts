import { Type } from '@angular/core';
import { HalCollectionTranslator } from '../translator';
/**
 * A translator that returns Arrays as-is.
 */
export declare class HalArrayTranslator implements HalCollectionTranslator {
    /**
     * Only apply to Arrays.
     */
    appliesTo(type: Type): boolean;
    toArray(value: any, type: Type): any[];
    fromArray(value: any[], type: Type): any;
}
