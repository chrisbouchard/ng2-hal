import {Injectable} from 'angular/core';
import {Http, RequestOptionsArgs, Response} from 'angular/http';
import {Observable} from 'rxjs';

import {AnyConstructor} from '../common/core';

import {getMetadataPropertySet} from './metadata';
import {HalObject} from './object';
import {HalResource} from './resource';
import {HAL_EMBEDDED_METADATA_KEY, HAL_FACTORY_METADATA_KEY, HAL_LINKS_METADATA_KEY} from './symbols';

@Injectable()
export class HalClient {
  constructor(private http: Http) {}

  resource<T>(url: string, ctor: AnyConstructor<T>): HalResource<T> {
    return new HalResourceImpl(url, this, ctor);
  }
}

class HalResourceImpl<T> implements HalResource<T> {
  constructor(public url: string, private client: HalClient, private ctor: AnyConstructor<T>) {}

  delete(): Observable<T> {
    return undefined;
  }

  get(): Observable<T> {
    return undefined;
  }

  post<U>(body: U): Observable<U> {
    return undefined;
  }

  put(body: T): Observable<T> {
    return undefined;
  }
}

export function createFromHal<T>(http: Http, halObj: HalObject, ctor: AnyConstructor<T>): T {
  let obj: T;

  if (Reflect.hasOwnMetadata(HAL_FACTORY_METADATA_KEY, ctor)) {
    let metadata: HalFactoryMetadata = Reflect.getOwnMetadata(HAL_FACTORY_METADATA_KEY, ctor);

    switch (metadata.type) {
      case HalFactoryType.CONSTRUCTOR:
        obj = new ctor(halObj.resource);
        break;
      case HalFactoryType.METHOD:
        obj = ctor[metadata.method](halObj.resource);
        break;
    }
  }
  else {
    obj = new ctor();
    Object.assign(obj, halObj.resource);
  }

  let embeddedProps = getMetadataPropertySet<AnyConstructor<any>>(HAL_EMBEDDED_METADATA_KEY, ctor.prototype);
  let linksProps = getMetadataPropertySet<AnyConstructor<any>>(HAL_LINKS_METADATA_KEY, ctor.prototype);

  mapHalSubobjects(
    obj, ctor.prototype, embeddedProps, halObj.embedded,
    propCtor => subobject => createFromHal(http, subobject, propCtor)
  );
  mapHalSubobjects(
    obj, ctor.prototype, linksProps, halObj.links,
    propCtor => subobject => new HalResourceImpl(subobject.href, http, propCtor)
  );

  return obj;
}

function mapHalSubobjects<T>(target: any, prototype: any, props: Map<string | symbol, AnyConstructor<any>>,
    array: Array<T>, factory: (ctor: AnyConstructor<any>) => (subobject: T) => any) {
  for (let prop of props.keys()) {
    let propCtor = props.get(prop);
    let propArray = array.get(prop).map(factory(propCtor));
    let type = Reflect.getOwnMetadata('design:type', prototype, prop);
    obj[prop] = projectArray(propArray, type);
  }
}

function projectArray<T>(array: Array<T>, type: any) {
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

