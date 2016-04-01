import {IdentifierType} from '../common/core';

export class HalLinkObject {
  constructor(public href: string, public templated: boolean) {}
}

export class HalObject {
  constructor(
    public embedded: { [key: string]: HalObject | HalObject[] },
    public links: { [key: string]: HalLinkObject | HalLinkObject[] },
    public resource: any
  ) {}
}

export abstract class HalObjectSerializer {
  abstract deserialize(data: string): HalObject | HalObject[];
  abstract serialize(object: HalObject | HalObject[]): string;
}

