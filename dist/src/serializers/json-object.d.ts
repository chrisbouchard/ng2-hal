import { HalObject, HalObjectSerializer } from '../object';
export declare abstract class HalJsonObjectSerializerOptions {
    embeddedKey: string;
    linksKey: string;
}
export declare class BaseHalJsonObjectSerializerOptions extends HalJsonObjectSerializerOptions {
    constructor();
}
export declare class HalJsonObjectSerializer extends HalObjectSerializer {
    options: HalJsonObjectSerializerOptions;
    constructor(options: HalJsonObjectSerializerOptions);
    deserialize(data: string): HalObject | HalObject[];
    private toObjectOrArray(json);
    private toObject(json);
    private toLinkObjectOrArray(json);
    private toLinkObject(json);
    serialize(object: HalObject | HalObject[]): string;
}
