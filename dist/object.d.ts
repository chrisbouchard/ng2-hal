export declare class HalLinkObject {
    href: string;
    templated: boolean;
    constructor(href: string, templated: boolean);
}
export declare class HalObject {
    embedded: {
        [key: string]: HalObject | HalObject[];
    };
    links: {
        [key: string]: HalLinkObject | HalLinkObject[];
    };
    resource: any;
    constructor(embedded: {
        [key: string]: HalObject | HalObject[];
    }, links: {
        [key: string]: HalLinkObject | HalLinkObject[];
    }, resource: any);
}
export declare abstract class HalObjectSerializer {
    abstract deserialize(data: string): HalObject | HalObject[];
    abstract serialize(object: HalObject | HalObject[]): string;
}
