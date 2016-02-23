import {arrayify, construct} from '../common/core';

export interface HalLinkObject {
  href: string;
}

export class HalObject {
  embedded: Map<string | symbol, HalObject[]>;
  links: Map<string | symbol, HalLinkObject[]>;
  resource: any;

  constructor(json: any) {
    this.resource = {};

    for (let [key, value] of Object.entries(json)) {
      switch (key) {
        case '_embedded':
          /* Propagate HalObject into the embedded objects. We need to make sure we wind up with an Array. */
          this.embedded = new Map<string | symbol, HalObject[]>(
            Object.entries(value).map(([k, v]): [string, HalObject[]] => [k, arrayify(v).map(construct(HalObject))])
          );
          break;

        case '_links':
          /* We need to make sure we wind up with an Array. */
          this.links = new Map<string | symbol, HalLinkObject[]>(
            Object.entries(value).map(([k, v]): [string, HalLinkObject[]] => [k, arrayify(v)])
          );
          break;

        default:
          this.resource[key] = value;
          break;
      }
    }

    if (!this.embedded) {
      this.embedded = new Map();
    }

    if (!this.links) {
      this.links = new Map();
    }
  }
}

