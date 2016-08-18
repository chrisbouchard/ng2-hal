import { Injectable, Type } from '@angular/core';

import { HalFieldTypeDescription, HalFieldTypeMetadata } from './field';
import { HalLinkObject } from './object';
import { HalResource } from './resource';
import { HalResourceFactory } from './resource-factory';

/**
 *
 */
@Injectable()
export class HalClient {
  constructor(private resourceFactory: HalResourceFactory) {}

  resource<T>(url: string, metadata: Type | HalFieldTypeMetadata): HalResource<T> {
    return this.resourceFactory.createResource<T>(new HalLinkObject(url, false), new HalFieldTypeDescription(metadata));
  }
}

