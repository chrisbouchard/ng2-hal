import {Observable} from 'rxjs';
import {AnyConstructor} from '../common/core';

export interface HalResource<T> {
  url: string;

  delete(): Observable<T>;
  get(): Observable<T>;
  post<U>(body: U): Observable<U>;
  put(body: T): Observable<T>;
}

