import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs';

import {default as UriTemplate, UriValueType, UriMappingType} from 'uri-templates';

import {mapToObject} from '../common/core';

import {HalFieldTypeDescription, HalFieldTypeMetadata} from './field';
import {HalHttp} from './http';
import {HalInstanceFactory} from './instance_factory';
import {HalLinkObject} from './object';
import {HalResource} from './resource';
import {HalResourceFactory} from './resource_factory';

/**
 *
 */
@Injectable()
export class HalHttpResourceFactory extends HalResourceFactory {
  constructor(private halHttp: HalHttp, private instanceFactory: HalInstanceFactory) {
    super();
  }

  createResource(link: HalLinkObject, typeDescription: HalFieldTypeDescription): HalHttpResource<any> {
    return new HalHttpResource<any>(link, typeDescription, this.halHttp, this.instanceFactory, this);
  }
}


/**
 *
 */
export class HalHttpResource<T> implements HalResource<T> {
  constructor(
    private link: HalLinkObject,
    private typeDescription: HalFieldTypeDescription,
    private halHttp: HalHttp,
    private instanceFactory: HalInstanceFactory,
    private resourceFactory: HalHttpResourceFactory
  ) {}

  get(params?: UriMappingType): Observable<T> {
    return this.halHttp.get(this.filledUrl(params)).map(
      object => this.instanceFactory.createInstance(object, this.typeDescription, this.resourceFactory)
    );
  }

  delete(params?: UriMappingType): Observable<void> {
    return this.halHttp.delete(this.filledUrl(params));
  }

  post<U>(body: any, params?: UriMappingType, typeDescription?: HalFieldTypeMetadata): Observable<HalResource<U>> {
    // TODO: Implement this method.
    return undefined;
  }

  put(body: T, params?: UriMappingType): Observable<HalResource<T>> {
    // TODO: Implement this method.
    return undefined;
  }

  private filledUrl(params: UriMappingType): string {
    const template = new UriTemplate(this.link.href);
    return template.fill(params);
  }
}

