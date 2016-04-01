import {Injectable, Type} from 'angular2/core';

import {HalLinkObject} from './object';
import {HalResource} from './resource';
import {HalResourceFactory} from './resource_factory';
import {HalFieldTypeDescription, HalFieldTypeMetadata} from './field';

/**
 *
 */
@Injectable()
export class HalClient {
  constructor(private resourceFactory: HalResourceFactory) {}

  resource<T>(url: string, metadata: Type | HalFieldTypeMetadata): HalResource<T> {
    return this.resourceFactory.createResource(new HalLinkObject(url, false), new HalFieldTypeDescription(metadata));
  }
}

