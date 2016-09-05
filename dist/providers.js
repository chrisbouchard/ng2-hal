"use strict";
const client_1 = require('./client');
const http_1 = require('./http');
const http_resource_factory_1 = require('./http-resource-factory');
const instance_factory_1 = require('./instance-factory');
const object_1 = require('./object');
const resource_factory_1 = require('./resource-factory');
const translator_1 = require('./translator');
const json_object_1 = require('./serializers/json-object');
const array_translator_1 = require('./translators/array-translator');
const default_object_translator_1 = require('./translators/default-object-translator');
exports.HAL_PROVIDERS = [
    client_1.HalClient, http_1.HalHttp, instance_factory_1.HalInstanceFactory,
    { provide: object_1.HalObjectSerializer, useClass: json_object_1.HalJsonObjectSerializer },
    { provide: json_object_1.HalJsonObjectSerializerOptions, useClass: json_object_1.BaseHalJsonObjectSerializerOptions },
    { provide: resource_factory_1.HalResourceFactory, useClass: http_resource_factory_1.HalHttpResourceFactory },
    { provide: translator_1.HAL_COLLECTION_TRANSLATORS, useClass: array_translator_1.HalArrayTranslator, multi: true },
    { provide: translator_1.HAL_OBJECT_TRANSLATORS, useClass: default_object_translator_1.HalDefaultObjectTranslator, multi: true }
];
//# sourceMappingURL=providers.js.map