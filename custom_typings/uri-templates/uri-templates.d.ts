declare module 'uri-templates' {
  export default class UriTemplate {
    constructor(template: string);

    fill(obj: UriMappingType): string;
    fill(fn: (varName: string) => string): string;
    fillFromObject(obj: UriMappingType): string;
    fromUri(uri: string): UriMappingType;
    toString(): string;

    varNames: string[];
  }

  export type UriValueType = string | string[] | { [key: string]: string };
  export type UriMappingType = {} | { [key: string]: UriValueType }
}

