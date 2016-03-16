declare module 'uri-templates' {
    export interface FlatObject {
        [key: string]: string;
    }

    export interface VariablesObject {
        [key: string]: string | string[] | FlatObject;
    }

    export interface UriTemplate {
        fill(obj: VariablesObject): string;
        fill(fn: (varName: string) => string): string;
        fillFromObject(obj: VariablesObject): string;
        fromUri(uri: string): VariablesObject;
        toString(): string;

        varNames: string[];
    }

    export interface UriTemplateStatic {
        (path: string): UriTemplate;
        new (path: string): UriTemplate;
    }

    const UriTemplate: UriTemplateStatic;
    export default UriTemplate;
}

