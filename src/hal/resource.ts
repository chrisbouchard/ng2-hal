import {Observable} from 'rxjs';
import {AnyConstructor} from '../common/core';

export interface HalResource<T> {
  url: string;

  get(): Observable<T>;

  delete(): Observable<void>;

  post<U>(body: U): Observable<HalResource<U>>;
  post<U>(body: any, ctor: AnyConstructor<U>): Observable<HalResource<U>>;

  put(body: T): Observable<HalResource<T>>;
}

