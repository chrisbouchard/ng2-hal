import {Http} from 'angular/http';
import {Observable} from 'rxjs';
import {AnyConstructor} from '../common/core';

export interface HalResource<T> {
  url: string;

  delete(): Observable<T>;
  get(): Observable<T>;
  post<U>(body: U): Observable<U>;
  put(body: T): Observable<T>;
}

export class HalResourceImpl<T> {
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

