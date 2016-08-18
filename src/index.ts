export { UriMappingType } from 'uri-templates';

export { HalClient } from './client';
export { HalError } from './error';
export { HalEmbedded, HalField, HalFieldMetadata, HalFieldSection, HalFieldTypeMetadata, HalLink } from './field';
export { HalModule } from './hal.module';
export { HalHttp } from './http';
export { HalInstanceFactory } from './instance-factory';
export { HalResource } from './resource';
export { HalResourceFactory } from './resource-factory';
export { HalCollectionTranslator, HalObjectTranslator, HalTranslator } from './translator';

export { BaseHalJsonObjectSerializerOptions, HalJsonObjectSerializer, HalJsonObjectSerializerOptions } from './serializers/json-object';

export { HalArrayTranslator } from './translators/array-translator';
export { HalDefaultObjectTranslator } from './translators/default-object-translator';

var keepBabelHappy: any = false;

