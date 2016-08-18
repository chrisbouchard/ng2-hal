import { Injectable } from '@angular/core';

import { HalLinkObject, HalObject, HalObjectSerializer } from '../object';

export abstract class HalJsonObjectSerializerOptions {
  embeddedKey: string;
  linksKey: string;
}

@Injectable()
export class BaseHalJsonObjectSerializerOptions extends HalJsonObjectSerializerOptions {
  constructor() {
    super();
    this.embeddedKey = '_embedded';
    this.linksKey = '_links';
  }
}

@Injectable()
export class HalJsonObjectSerializer extends HalObjectSerializer {
  constructor (public options: HalJsonObjectSerializerOptions) {
    super();
  }

  deserialize(data: string): HalObject | HalObject[] {
    let json: any = JSON.parse(data);
    return this.toObject(json);
  }

  private toObject(json: any): HalObject | HalObject[] {
    /* Special case when the JSON is an array. */
    if (json instanceof Array) {
      return json.map((element: any) => this.toObject(element));
    }

    let embedded: { [key: string]: HalObject | HalObject[] } = {};
    let links: { [key: string]: HalLinkObject | HalLinkObject[] } = {};
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
          /* Propagate HalLinkObject into the links. */
          for (let [linkKey, linkValue] of Object.entries(value)) {
            links[linkKey] = this.toLinkObject(linkValue);
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
    /* Special case when the JSON is an array. */
    if (json instanceof Array) {
      return json.map((element: any) => this.toLinkObject(element));
    }

    return new HalLinkObject(json.href, json.templated);
  }

  serialize(object: HalObject | HalObject[]): string {
    return '';
  }
}

