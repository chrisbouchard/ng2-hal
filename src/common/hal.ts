import {Observable} from 'rxjs';
import {Http, RequestOptionsArgs, Response} from 'angular/http';


const HAL_EMBEDDED_METADATA_KEY = Symbol('halEmbedsMetadataKey');
const HAL_FACTORY_METADATA_KEY = Symbol('halFactoryMetadataKey');
const HAL_LINKS_METADATA_KEY = Symbol('halLinksMetadataKey');
const HAL_RESOURCE = Symbol('halResource');


interface HalFactoryMethod<T> {
  (json: any): T;
}

enum HalFactoryType {
  CONSTRUCTOR, METHOD
}

class HalFactoryMetadata {
  constructor(public type: HalFactoryType, public method?: string | symbol) {}
}


export interface AnyConstructor<T> {
  new(...args: Array<any>): T;
}


export interface HalResource<T> {
  url: string;

  delete(): Observable<T>;
  get(): Observable<T>;
  post<U>(body: U): Observable<U>;
  put(body: T): Observable<T>;
}

class HalResourceImpl<T> {
  constructor(public url: string, private http: Http, private ctor: AnyConstructor<T>) {}

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


export function HalFactory<TFunction extends Function>(target: TFunction, key?: string | symbol,
    description?: TypedPropertyDescriptor<any>): void {
  let metadata: HalFactoryMetadata;

  if (key) {
    metadata = new HalFactoryMetadata(HalFactoryType.METHOD, key);
  }
  else {
    metadata = new HalFactoryMetadata(HalFactoryType.CONSTRUCTOR);
  }

  Reflect.defineMetadata(HAL_FACTORY_METADATA_KEY, metadata, target);
}


function getMetadataPropertyMap<T>(key: any, target: any): Map<string | symbol, T> {
  if (Reflect.hasOwnMetadata(key, target)) {
    return Reflect.getOwnMetadata(key, target);
  }

  let links = new Map<string | symbol, T>();
  Reflect.defineMetadata(key, links, target);
  return links;
}


export function HalEmbedded(ctor: AnyConstructor<T>): PropertyDecorator {
  return function(target, key): void {
    getMetadataPropertyMap<AnyConstructor<T>>(HAL_EMBEDDED_METADATA_KEY, target).set(key, ctor);
  };
}

export function HalLinked(ctor: AnyConstructor<T>): PropertyDecorator {
  return function(target, key): void {
    getMetadataPropertyMap<AnyConstructor<T>>(HAL_LINKS_METADATA_KEY, target).set(key, ctor);
  };
}


interface HalLinkObject {
  href: string;
}

class HalObject {
  embedded: Map<string, Array<HalObject>>;
  links: Map<string, Array<HalLinkObject>>;
  resource: any;

  constructor(halJson: any) {
    this.resource = {};

    for (let [key, value] of halJson.entries()) {
      switch (key) {
        case '_embedded':
          /* Propagate HalObject into the embedded objects. We need to make sure we wind up with an Array. */
          this.embedded = new Map(
            value.entries().map(([k, v]) => [k, Array.isArray(v) ? v.map(x => new HalObject(x)) : [new HalObject(v)]])
          );
          break;

        case '_links':
          /* We need to make sure we wind up with an Array. */
          this.links = new Map(
            value.entries().map(([k, v]) => [k, Array.isArray(v) ? v : [v]])
          );
          break;

        default:
          this.resource[key] = value;
          break;
      }
    }

    if (!this.embedded) {
      this.embedded = new Map();
    }

    if (!this.links) {
      this.links = new Map();
    }
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

  let embeddedProps = getMetadataPropertySet(HAL_EMBEDDED_METADATA_KEY, ctor.prototype);
  let linksProps = getMetadataPropertySet(HAL_LINKS_METADATA_KEY, ctor.prototype);

  for (let [prop, embeddedCtor] of embeddedProps.entries()) {
    let array = halObj.embedded.get(prop).map(x => createFromHal<any>(http, x, embeddedCtor));
    let type = Reflect.getOwnMetadata('design:type', ctor.prototype, prop);
    obj[prop] = projectArray(array, type);
  }

  for (let [prop, linkCtor] of linksProps.entries()) {
    let array = halObj.links.get(prop).map(x => new HalResourceImpl<any>(x.href, http, linkCtor));
    let type = Reflect.getOwnMetadata('design:type', ctor.prototype, prop);
    obj[prop] = projectArray(array, type);
  }

  return obj;
}

