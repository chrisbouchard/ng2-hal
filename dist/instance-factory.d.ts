import { HalFieldTypeDescription } from './field';
import { HalResourceFactory } from './resource-factory';
import { HalCollectionTranslator, HalObjectTranslator } from './translator';
export declare class HalInstanceFactory {
    private collectionTranslators;
    private objectTranslators;
    constructor(collectionTranslators: HalCollectionTranslator[], objectTranslators: HalObjectTranslator[]);
    createInstance(value: any, typeDescription: HalFieldTypeDescription, resourceFactory: HalResourceFactory): any;
    private fillInstance(target, source, type, section, resourceFactory);
}
