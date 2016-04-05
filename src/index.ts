export {UriMappingType} from 'uri-templates';

export {HalClient} from './client';
export {HalError} from './error';
export {HalEmbedded, HalField, HalFieldMetadata, HalFieldSection, HalFieldTypeMetadata, HalLink} from './field';
export {HalHttp} from './http';
export {HalInstanceFactory} from './instance_factory';
export {HAL_PROVIDERS} from './providers';
export {HalResource} from './resource';
export {HalResourceFactory} from './resource_factory';
export {HalCollectionTranslator, HalObjectTranslator, HalTranslator, HAL_COLLECTION_TRANSLATORS, HAL_OBJECT_TRANSLATORS} from './translator';

export {BaseHalJsonObjectSerializerOptions, HalJsonObjectSerializer, HalJsonObjectSerializerOptions} from './serializers/json_object';

var keepBabelHappy: any = false;

