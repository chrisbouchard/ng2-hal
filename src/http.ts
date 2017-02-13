import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { HalError } from './error';
import { HalFieldTypeDescription } from './field';
import { HalInstanceFactory } from './instance-factory';
import { HalLinkObject, HalObject, HalObjectSerializer } from './object';

/**
 *
 */
@Injectable()
export class HalHttp {
  constructor(private objectSerializer: HalObjectSerializer, private http: Http) {}

  get(url: string): Observable<HalObject | HalObject[]> {
    return this.http.get(url)
        .map(handleErrorResponse)
        .map(response => {
          if (response.status === 204) {
            return undefined;
          }

          return this.objectSerializer.deserialize(response.text());
        });
  }

  delete(url: string): Observable<void> {
    return undefined;
  }

  post(url:string, body: HalObject | HalObject[]): Observable<HalLinkObject> {
    return undefined;
  }

  put(url:string, body: HalObject | HalObject[]): Observable<HalLinkObject> {
    return undefined;
  }
}


function handleErrorResponse(response: Response): Response {
  const status = response.status;

  /* This is probably a little over-zealous, but it corresponds to !response.ok (which doesn't work with the current
    * Angular 2 beta. */
  if (status < 200 || status >= 300) {
    throw new HalError(status, response.text());
  }

  return response;
}

function mapUpdate(response: Response): HalLinkObject {
  if (response.headers.has('Location')) {
    return new HalLinkObject(response.headers.get('Location'), false);
  }

  return undefined;
}

