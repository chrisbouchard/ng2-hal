import {Injectable} from 'angular2/core';
import {Http, RequestOptionsArgs, Response} from 'angular2/http';
import {autobind} from 'core-decorators';
import {Observable} from 'rxjs';
import {UriTemplate, ValueType as UriValueType} from 'uri-templates';

import {AnyConstructor, construct, mapToObject, projectArray} from '../common/core';

import {HalError} from './error';
import {HalFactoryMethod} from './factory';
import {HalLinkObject, HalObject} from './object';
import {HalResource} from './resource';
import {HAL_DECORATOR_METADATA_KEY, HAL_FACTORY_METADATA_KEY} from './symbols';

/**
 *
 */
@Injectable()
export class HalClient {
  constructor(private http: Http) {}

  resource<T>(url: string, ctor: AnyConstructor<T>): HalResource<T> {
    return new HalClientResource(url, ctor, this);
  }

  get<T>(url: string, ctor: AnyConstructor<T>, options?: RequestOptionsArgs): Observable<T> {
    const factory = new HalObjectFactory(ctor, this);

    return this.http
        .get(url, options)
        .map(responseMappers.mapError)
        .map(responseMappers.mapGet)
        .map(factory.from);
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<void> {
    return undefined;
  }

  post<T>(url:string, body: any, ctor: AnyConstructor<T>, options?: RequestOptionsArgs): Observable<HalResource<T>> {
    return undefined;
  }

  put<T>(url:string, body: any, ctor: AnyConstructor<T>, options?: RequestOptionsArgs): Observable<HalResource<T>> {
    return undefined;
  }
}

const responseMappers = {
  mapError(response: Response): Response {
    const status = response.status;

    /* This is probably a little over-zealous, but it corresponds to !response.ok (which doesn't work with the current
     * Angular 2 beta. */
    if (status < 200 || status >= 300) {
      throw new HalError(status, response.text());
    }

    return response;
  },

  mapGet(response: Response): HalObject {
    /* No Content */
    if (response.status === 204) {
      return undefined;
    }

    return new HalObject(response.json());
  },

  mapDelete(response: Response): void {
    return undefined;
  },

  mapUpdate(response: Response): HalLinkObject {
    if (response.headers.has('Location')) {
      return { href: response.headers.get('Location') };
    }

    return undefined;
  }
};

/**
 *
 */
export class HalClientResource<T> implements HalResource<T> {
  constructor(public url: string, private ctor: AnyConstructor<T>, private client: HalClient) {}

  get(params?: Map<string, UriValueType>): Observable<T> {
    return this.client.get(this.filledUrl(params), this.ctor);
  }

  delete(params?: Map<string, UriValueType>): Observable<void> {
    return this.client.delete(this.filledUrl(params));
  }

  post<U>(body: any, params?: Map<string, UriValueType>, ctor?: AnyConstructor<any>): Observable<HalResource<U>> {
    if (!ctor) {
      ctor = body.constructor;
    }

    return this.client.post(this.filledUrl(params), body, ctor);
  }

  put(body: T, params?: Map<string, UriValueType>): Observable<HalResource<T>> {
    return this.client.put(this.filledUrl(params), body, (body as any).constructor);
  }

  private filledUrl(params: Map<string, UriValueType>): string {
    const paramsObj = params ? mapToObject(params) : {};
    const template = new UriTemplate(this.url);

    return template.fill(paramsObj);
  }
}

/**
 *
 */
export interface HalDecoratorTransformation {
  apply(instance: any, object: HalObject, client: HalClient): void;
}

/**
 *
 */
export interface HalSubobjectFactory<T, U> {
  from(object: T): U;
}

/**
 *
 */
export class HalObjectFactory<T> implements HalSubobjectFactory<HalObject, T> {
  constructor(private ctor: AnyConstructor<T>, private client: HalClient) {}

  @autobind
  from(object: HalObject): T {
    if (!object) {
      return undefined;
    }

    const instance = this.createInstance(object.resource);
    this.applyDecorators(this.ctor.prototype, instance, object);
    return instance;
  }

  private createInstance(resource: any): T {
    let instance: T;

    /* We don't search the prototype chain for a factory, because the class should deside how it's constructed. */
    if (Reflect.hasOwnMetadata(HAL_FACTORY_METADATA_KEY, this.ctor)) {
      let method: HalFactoryMethod = Reflect.getOwnMetadata(HAL_FACTORY_METADATA_KEY, this.ctor);
      instance = method(resource);
    }
    else {
      instance = new this.ctor();
      Object.assign(instance, resource);
    }

    return instance;
  }

  private applyDecorators(prototype: any, instance: T, object: HalObject): void {
    if (!Reflect.hasOwnMetadata(HAL_DECORATOR_METADATA_KEY, prototype)) {
      return;
    }

    /* First apply the superclass's decorators. */
    this.applyDecorators(Object.getPrototypeOf(prototype), instance, object);

    const transformations: HalDecoratorTransformation[] = Reflect.getOwnMetadata(HAL_DECORATOR_METADATA_KEY, prototype);

    for (let transformation of transformations) {
      transformation.apply(instance, object, this.client);
    }
  }
}

/**
 *
 */
export class HalLinkFactory<T> implements HalSubobjectFactory<HalLinkObject, HalResource<T>> {
  constructor(private ctor: AnyConstructor<T>, private client: HalClient) {}

  @autobind
  from(link: HalLinkObject): HalResource<T> {
    if (!link) {
      return undefined;
    }

    return new HalClientResource(link.href, this.ctor, this.client);
  }
}

