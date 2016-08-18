import { Type } from '@angular/core';
import { HalFieldTypeMetadata } from './field';
import { HalResource } from './resource';
import { HalResourceFactory } from './resource-factory';
/**
 *
 */
export declare class HalClient {
    private resourceFactory;
    constructor(resourceFactory: HalResourceFactory);
    resource<T>(url: string, metadata: Type | HalFieldTypeMetadata): HalResource<T>;
}
