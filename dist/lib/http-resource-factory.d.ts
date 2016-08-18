import { Observable } from 'rxjs';
import { UriMappingType } from 'uri-templates';
import { HalFieldTypeDescription, HalFieldTypeMetadata } from './field';
import { HalHttp } from './http';
import { HalInstanceFactory } from './instance-factory';
import { HalLinkObject } from './object';
import { HalResource } from './resource';
import { HalResourceFactory } from './resource-factory';
/**
 *
 */
export declare class HalHttpResourceFactory extends HalResourceFactory {
    private halHttp;
    private instanceFactory;
    constructor(halHttp: HalHttp, instanceFactory: HalInstanceFactory);
    createResource<T>(link: HalLinkObject, typeDescription: HalFieldTypeDescription): HalHttpResource<T>;
}
/**
 *
 */
export declare class HalHttpResource<T> implements HalResource<T> {
    private link;
    private typeDescription;
    private halHttp;
    private instanceFactory;
    private resourceFactory;
    constructor(link: HalLinkObject, typeDescription: HalFieldTypeDescription, halHttp: HalHttp, instanceFactory: HalInstanceFactory, resourceFactory: HalHttpResourceFactory);
    get(params?: UriMappingType): Observable<T>;
    delete(params?: UriMappingType): Observable<void>;
    post<U>(body: any, params?: UriMappingType, typeDescription?: HalFieldTypeMetadata): Observable<HalResource<U>>;
    put(body: T, params?: UriMappingType): Observable<HalResource<T>>;
    private filledUrl(params);
}
