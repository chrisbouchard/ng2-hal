import {Injectable} from 'angular2/core';
import {Http, RequestOptionsArgs, Response} from 'angular2/http';
import {autobind} from 'core-decorators';
import {Observable} from 'rxjs';

import {AnyConstructor, construct, projectArray} from '../common/core';

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
    let factory = new HalObjectFactory(ctor, this);

    return this.http
        .get(url, options)
        .map(HalClient.mapErrorResponse)
        .map(HalClient.mapGetResponse)
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

  private static mapErrorResponse(response: Response): Response {
    if (!response.ok) {
      throw new HalError(response.status, response.text());
    }

    return response;
  }

  private static mapGetResponse(response: Response): HalObject {
    /* No Content */
    if (response.status === 204) {
      return undefined;
    }

    return new HalObject(response.json());
  }

  private static mapDeleteResponse(response: Response): void {
    return undefined;
  }

  private static mapUpdateResponse(response: Response): HalLinkObject {
    if (response.headers.has('Location')) {
      return { href: response.headers.get('Location') };
    }

    return undefined;
  }
}

/**
 *
 */
export class HalClientResource<T> implements HalResource<T> {
  constructor(public url: string, private ctor: AnyConstructor<T>, private client: HalClient) {}

  get(): Observable<T> {
    return this.client.get(this.url, this.ctor);
  }

  delete(): Observable<void> {
    return this.client.delete(this.url);
  }

  post<U>(body: any, ctor?: AnyConstructor<any>): Observable<HalResource<U>> {
    if (!ctor) {
      ctor = body.constructor;
    }

    return this.client.post(this.url, body, ctor);
  }

  put(body: T): Observable<HalResource<T>> {
    return this.client.put(this.url, body, (body as any).constructor);
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

    let instance = this.createInstance(object.resource);
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

    let transformations: HalDecoratorTransformation[] = Reflect.getOwnMetadata(HAL_DECORATOR_METADATA_KEY, prototype);

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

