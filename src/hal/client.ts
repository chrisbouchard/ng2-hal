import {Injectable} from 'angular2/core';
import {Http, RequestOptionsArgs, Response} from 'angular2/http';
import {Observable} from 'rxjs';

import {AnyConstructor} from '../common/core';

import {HalFactoryMetadata, HalFactoryType} from './factory';
import {getMetadataPropertyMap} from './metadata';
import {HalLinkObject, HalObject} from './object';
import {HalResource} from './resource';
import {HAL_EMBEDDED_METADATA_KEY, HAL_FACTORY_METADATA_KEY, HAL_LINKS_METADATA_KEY} from './symbols';

@Injectable()
export class HalClient {
  constructor(private http: Http) {}

  resource<T>(url: string, ctor: AnyConstructor<T>): HalResource<T> {
    return new HalResourceImpl(url, this.http, ctor);
  }
}

class HalResourceImpl<T> implements HalResource<T> {
  constructor(public url: string, private http: Http, private ctor: AnyConstructor<T>) {}

  get(): Observable<T> {
    return this.http.get(this.url).map(response => createFromHal(this.http, new HalObject(response.json()), this.ctor));
  }

  delete(): Observable<void> {
    return undefined;
  }

  post(body: any): Observable<void> {
    return undefined;
  }

  put(body: T): Observable<void> {
    return undefined;
  }
}

function createFromHal<T>(http: Http, halObj: HalObject, ctor: AnyConstructor<T>): T {
  let obj: T;

  if (Reflect.hasOwnMetadata(HAL_FACTORY_METADATA_KEY, ctor)) {
    let metadata: HalFactoryMetadata = Reflect.getOwnMetadata(HAL_FACTORY_METADATA_KEY, ctor);

    switch (metadata.type) {
      case HalFactoryType.CONSTRUCTOR:
        obj = new ctor(halObj.resource);
        break;
      case HalFactoryType.METHOD:
        obj = (ctor as any)[metadata.method](halObj.resource);
        break;
    }
  }
  else {
    obj = new ctor();
    Object.assign(obj, halObj.resource);
  }

  let embeddedProps = getMetadataPropertyMap<AnyConstructor<any>>(HAL_EMBEDDED_METADATA_KEY, ctor.prototype);
  let linksProps = getMetadataPropertyMap<AnyConstructor<any>>(HAL_LINKS_METADATA_KEY, ctor.prototype);

  mapHalSubobjects<HalObject>(
    obj, ctor.prototype, embeddedProps, halObj.embedded,
    (propCtor: AnyConstructor<any>) => (subobject: any) => createFromHal(http, subobject, propCtor)
  );

  mapHalSubobjects<HalLinkObject>(
    obj, ctor.prototype, linksProps, halObj.links,
    (propCtor: AnyConstructor<any>) => (subobject: any) => new HalResourceImpl(subobject.href, http, propCtor)
  );

  return obj;
}

function mapHalSubobjects<T>(target: any, prototype: any, props: Map<string | symbol, AnyConstructor<any>>,
    map: Map<string | symbol, Array<T>>, factory: (ctor: AnyConstructor<any>) => (subobject: T) => any) {
  for (let prop of props.keys()) {
    let propCtor = props.get(prop);
    let propArray = map.get(prop).map(factory(propCtor));
    let type = Reflect.getOwnMetadata('design:type', prototype, prop);
    target[prop] = projectArray(propArray, type);
  }
}

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

