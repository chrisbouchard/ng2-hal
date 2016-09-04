import { Type } from '@angular/core';
import { HalObjectTranslator } from '../translator';
/**
 * A translator that simply returns the value as given.
 */
export declare class HalDefaultObjectTranslator implements HalObjectTranslator {
    /**
     * Only apply when we've reached the bottom of the prototype chain.
     */
    appliesTo(type: Type<any>): boolean;
    toObject(value: any, type: Type<any>): any;
    fromObject(value: any, type: Type<any>): any;
}
