import {HalFieldTypeDescription} from './field';
import {HalLinkObject} from './object';
import {HalResource} from './resource';

export abstract class HalResourceFactory {
  abstract createResource(link: HalLinkObject, typeDescription: HalFieldTypeDescription): HalResource<any>;
}

