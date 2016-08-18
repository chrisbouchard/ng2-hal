import { HalFieldTypeDescription } from './field';
import { HalLinkObject } from './object';
import { HalResource } from './resource';

export abstract class HalResourceFactory {
  abstract createResource<T>(link: HalLinkObject, typeDescription: HalFieldTypeDescription): HalResource<T>;
}

