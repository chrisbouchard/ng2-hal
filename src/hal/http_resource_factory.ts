import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs';
import {UriTemplate, ValueType as UriValueType} from 'uri-templates';

import {HalFieldTypeDescription} from './field';
import {HalInstanceFactory} from './instance_factory';
import {HalLinkObject} from './object';
import {HalResource} from './resource';
import {HalResourceFactory} from './resource_factory';

/**
 *
 */
@Injectable()
export class HalHttpResourceFactory extends HalResourceFactory {
  constructor(private halHttp: HalHttp, private instanceFactory: HalInstanceFactory) {}

  createResource(link: HalLinkObject, typeDescription: HalFieldTypeDescription): HalResource<any> {
    return new HalClientResource<any>(link, typeDescription, this.halHttp, this.instanceFactory);
  }
}


/**
 *
 */
export class HalClientResource<T> implements HalResource<T> {
  constructor(
    private link: HalLinkObject,
    private typeDescription: HalFieldTypeDescription,
    private halHttp: HalHttp,
    private instanceFactory: HalInstanceFactory
  ) {}

  get(params?: Map<string, UriValueType>): Observable<T> {
    return this.halHttp.get(this.filledUrl(params)).map(
      object => this.instanceFactory.createInstance(object, this.typeDescription)
    );
  }

  delete(params?: Map<string, UriValueType>): Observable<void> {
    return this.halHttp.delete(this.filledUrl(params));
  }

  post<U>(body: any, params?: Map<string, UriValueType>, typeDescription: HalFieldTypeDescription): Observable<HalResource<U>> {
    // TODO: Implement this method.
    return undefined;
  }

  put(body: T, params?: Map<string, UriValueType>): Observable<HalResource<T>> {
    // TODO: Implement this method.
    return undefined;
  }

  private filledUrl(params: Map<string, UriValueType>): string {
    const paramsObj = params ? mapToObject(params) : {};
    const template = new UriTemplate(this.link.href);

    return template.fill(paramsObj);
  }
}

