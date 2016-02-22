import {Injectable} from 'angular2/core';
import {Http, RequestOptionsArgs, Response} from 'angular2/http';
import {autobind} from 'core-decorators';
import {Observable} from 'rxjs';

import {AnyConstructor} from '../common/core';

import {HalFactoryMetadata, HalFactoryType} from './factory';
import {getMetadataPropertyMap} from './metadata';
import {HalLinkObject, HalObject} from './object';
import {HalResource} from './resource';
import {HAL_EMBEDDED_METADATA_KEY, HAL_FACTORY_METADATA_KEY, HAL_LINKS_METADATA_KEY} from './symbols';

/**
 *
 */
@Injectable()
export class HalClient {
  constructor(private http: Http) {}

  resource<T>(url: string, ctor: AnyConstructor<T>): HalResource<T> {
    return new HalResourceImpl(url, ctor, this);
  }

  get<T>(url: string, ctor: AnyConstructor<T>, options?: RequestOptionsArgs): Observable<T> {
    return this.http
        .get(url, options)
        .map(HalClient.mapGetResponse)
        .map(new HalObjectTransformer(ctor, this).transform);
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

  private static mapGetResponse(response: Response): HalObject {
    if (!response.ok) {
      throw new HalError(response.status, response.text());
    }

    if (response.status === 200) {
      return new HalObject(response.json());
    }

    return undefined;
  }

  private static mapDeleteResponse(response: Response): void {
  }

  private static mapUpdateResponse(response: Response): HalLinkObject {
    return undefined;
  }
}

/**
 *
 */
export class HalError {
  constructor(public status: number, public message: string) {}
}

/**
 *
 */
class HalResourceImpl<T> implements HalResource<T> {
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
class HalObjectTransformer<T> {
  constructor(private ctor: AnyConstructor<T>, private client: HalClient) {}

  @autobind
  toResource(link: HalLinkObject): HalResource<T> {
    if (!link) {
      return undefined;
    }

    return new HalResourceImpl(link.href, this.ctor, this.client);
  }

  @autobind
  toInstance(halObj: HalObject): T {
    if (!halObject) {
      return undefined;
    }

    let obj = this.createBaseObject(halObj.resource);

    let embeddedProps = getMetadataPropertyMap<AnyConstructor<any>>(HAL_EMBEDDED_METADATA_KEY, ctor.prototype);
    let linksProps = getMetadataPropertyMap<AnyConstructor<any>>(HAL_LINKS_METADATA_KEY, ctor.prototype);

    /* Map the embedded objects. */
    mapHalSubobjects<HalObject>(
      obj, ctor.prototype, embeddedProps, halObj.embedded,
      (propCtor: AnyConstructor<any>) => new HalObjectTransformer(propCtor, this.client).toInstance
    );

    /* Map the links. */
    mapHalSubobjects<HalLinkObject>(
      obj, ctor.prototype, linksProps, halObj.links,
      (propCtor: AnyConstructor<any>) => new HalObjectTransformer(propCtor, this.client).toResource
    );

    return obj;
  }

  private createBaseObject(resource: any): T {
    let obj: T;

    /* We don't search the prototype chain for a factory, because the class should deside how it's constructed. */
    if (Reflect.hasOwnMetadata(HAL_FACTORY_METADATA_KEY, ctor)) {
      let metadata: HalFactoryMetadata = Reflect.getOwnMetadata(HAL_FACTORY_METADATA_KEY, this.ctor);

      switch (metadata.type) {
        case HalFactoryType.CONSTRUCTOR:
          obj = new this.ctor(resource);
        break;
        case HalFactoryType.METHOD:
          obj = (this.ctor as any)[metadata.method](resource);
        break;
      }
    }
    else {
      obj = new this.ctor();
      Object.assign(obj, resource);
    }

    return obj;
  }
}

/**
 *
 */
function mapHalSubobjects<T>(target: any, prototype: any, props: Map<string | symbol, AnyConstructor<any>>,
    map: Map<string | symbol, Array<T>>, factory: (ctor: AnyConstructor<any>) => (subobject: T) => any) {
  for (let prop of props.keys()) {
    let propCtor = props.get(prop);
    let objectArray = map.get(prop);

    /* If we have HalObjects to use, use them. Otherwise leave the property undefined. */
    if (objectArray) {
      let array = objectArray.map(factory(propCtor));
      let type = Reflect.getOwnMetadata('design:type', prototype, prop);
      target[prop] = projectArray(array, type);
    }
    else {
      target[prop] = undefined;
    }
  }
}

/**
 *
 */
function projectArray<T>(array: Array<T>, type: any): any {
  switch (type) {
    case Array:
      return array;
    case Map:
      return new Map(array.entries());
    case Set:
      return new Set(array);
  }

  return array[0];
}

