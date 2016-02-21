import {Observable} from 'rxjs';
import {AnyConstructor} from '../common/core';

export interface HalResource<T> {
  url: string;

  get(): Observable<T>;

  delete(): Observable<void>;
  post(body: any): Observable<void>;
  put(body: T): Observable<void>;
}

