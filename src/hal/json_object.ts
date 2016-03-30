import {Injectable} from 'angular2/core';
import {arrayify, construct, IdentifierType} from '../common/core';
import {HalLinkObject, HalObject, HalObjectArray, HalObjectSerializer} from './object';

export abstract class HalJsonObjectSerializerOptions {
  embeddedKey: string;
  linksKey: string;
}

@Injectable()
export class BaseHalJsonObjectSerializerOptions extends HalJsonObjectSerializerOptions {
  constructor() {
    this.embeddedKey = '_embedded';
    this.linksKey = '_links';
  }
}

@Injectable()
export class HalJsonObjectSerializer extends HalObjectSerializer {
  constructor (public options: HalJsonObjectSerializerOptions) {}

  deserialize(data: string): HalObject {
    let json: any = JSON.parse(data);
    return this.deserializeHelper(json);
  }

  private toObject(json: any): HalObject | HalObject[] {
    /* Special case when the JSON is an array. */
    if (json instanceof Array) {
      return json.map(x => this.toObject(x));
    }

    let embedded: { [key: string]: HalObject[] } = {};
    let links: { [key: string]: HalLinkObject[] } = {};
    let resource: any = {};

    for (let [key, value] of Object.entries(json)) {
      switch (key) {
        case this.options.embeddedKey:
          /* Propagate HalObject into the embedded objects. */
          for (let [embedKey, embedValue] of Object.entries(value)) {
            embedded[embedKey] = this.toObject(embedValue);
          }
          break;

        case this.options.linksKey:
          /* We need to make sure we wind up with an Array. */
          for (let [linkKey, linkValue] of Object.entries(value)) {
            links[linkKey] = arrayify(linkValue).map(x => this.toLinkObject(x));
          }
          break;

        default:
          resource[key] = value;
          break;
      }
    }

    return new HalObject(embedded, links, resource);
  }

  private toLinkObject(json: any): HalLinkObject {
    return new HalLinkObject(json.href, json.templated);
  }

  serialize(object: HalObject): string {
    return '';
  }
}

