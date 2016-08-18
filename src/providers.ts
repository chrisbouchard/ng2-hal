import { provide } from '@angular/core';

import { HalClient } from './client';
import { HalHttp } from './http';
import { HalHttpResourceFactory } from './http-resource-factory';
import { HalInstanceFactory } from './instance-factory';
import { HalObjectSerializer } from './object';
import { HalResourceFactory } from './resource-factory';
import { HAL_COLLECTION_TRANSLATORS, HAL_OBJECT_TRANSLATORS, HalCollectionTranslator, HalObjectTranslator,
  HalTranslator } from './translator';

import {BaseHalJsonObjectSerializerOptions, HalJsonObjectSerializer, HalJsonObjectSerializerOptions} from './serializers/json-object';

import { HalArrayTranslator } from './translators/array-translator';
import { HalDefaultObjectTranslator } from './translators/default-object-translator';

export const HAL_PROVIDERS: any[] = [
  HalClient, HalHttp, HalInstanceFactory,

  provide(HalObjectSerializer, {useClass: HalJsonObjectSerializer}),
  provide(HalJsonObjectSerializerOptions, {useClass: BaseHalJsonObjectSerializerOptions}),
  provide(HalResourceFactory, {useClass: HalHttpResourceFactory}),
  provide(HAL_COLLECTION_TRANSLATORS, {useClass: HalArrayTranslator, multi: true}),
  provide(HAL_OBJECT_TRANSLATORS, {useClass: HalDefaultObjectTranslator, multi: true}),
];

