import {Observable} from 'rxjs';
import {Http, RequestOptionsArgs, Response} from 'angular/http';


const HAL_FACTORY_METADATA_KEY = Symbol('halFactoryMetadataKey');
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


export function HalLink(ctor: AnyConstructor<T>): PropertyDecorator {
  return function(target, key): void {
    delete target[key];

    Object.defineProperty(target, key, {
      configurable: true,
      get: function () {
      }
    });
  };
}


export function createFromHal<T>(http: Http, response: Response, ctor: AnyConstructor<T>): T {
  let url = response.url;
  let json = response.json();

  let obj: T;

  if (Reflect.hasOwnMetadata(HAL_FACTORY_METADATA_KEY, ctor)) {
    let metadata: HalFactoryMetadata = Reflect.getOwnMetadata(HAL_FACTORY_METADATA_KEY, ctor);

    switch (metadata.type) {
      case HalFactoryType.CONSTRUCTOR:
        obj = new ctor(json);
        break;
      case HalFactoryType.METHOD:
        obj = ctor[metadata.method](json);
        break;
    }
  }
  else {
    obj = new ctor();
    Object.assign(obj, json);
  }

  return obj;
}

