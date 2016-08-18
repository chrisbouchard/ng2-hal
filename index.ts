export { UriMappingType } from 'uri-templates';

export { HalClient } from './lib/client';
export { HalError } from './lib/error';
export { HalEmbedded, HalField, HalFieldMetadata, HalFieldSection, HalFieldTypeMetadata, HalLink } from './lib/field';
export { HalModule } from './lib/hal.module';
export { HalHttp } from './lib/http';
export { HalInstanceFactory } from './lib/instance-factory';
export { HalResource } from './lib/resource';
export { HalResourceFactory } from './lib/resource-factory';
export { HalCollectionTranslator, HalObjectTranslator, HalTranslator } from './lib/translator';

export { BaseHalJsonObjectSerializerOptions, HalJsonObjectSerializer, HalJsonObjectSerializerOptions } from './lib/serializers/json-object';

export { HalArrayTranslator } from './lib/translators/array-translator';
export { HalDefaultObjectTranslator } from './lib/translators/default-object-translator';

var keepBabelHappy: any = false;

