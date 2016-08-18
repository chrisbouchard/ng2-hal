import { Observable } from 'rxjs';
import { UriMappingType } from 'uri-templates';

import { HalFieldTypeMetadata } from './field';

export interface HalResource<T> {
  get(params?: UriMappingType): Observable<T>;

  delete(params?: UriMappingType): Observable<void>;

  post<U>(body: U, params?: UriMappingType): Observable<HalResource<U>>;
  post<U>(body: any, params: UriMappingType, metadata: HalFieldTypeMetadata): Observable<HalResource<U>>;

  put(body: T, params?: UriMappingType): Observable<HalResource<T>>;
}

