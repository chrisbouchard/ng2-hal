declare module 'uri-templates' {
    export type ValueType = string | string[] | { [key: string]: string };
    export type MappingType = {} | { [key: string]: ValueType }

    export class UriTemplate {
        constructor(template: string);

        fill(obj: MappingType): string;
        fill(fn: (varName: string) => string): string;
        fillFromObject(obj: MappingType): string;
        fromUri(uri: string): MappingType;
        toString(): string;

        varNames: string[];
    }
}

