import {provide} from 'angular2/core';

import {HalClient} from './client';
import {HalHttp} from './http';
import {HalHttpResourceFactory} from './http_resource_factory';
import {HalInstanceFactory} from './instance_factory';
import {HalResourceFactory} from './resource_factory';
import {HalCollectionTranslator, HalObjectTranslator, HalTranslator, HAL_COLLECTION_TRANSLATORS, HAL_OBJECT_TRANSLATORS} from './translators';

import {HalArrayTranslator} from './translators/array_translator';
import {HalDefaultObjectTranslator} from './translators/default_translator';

export const HAL_PROVIDERS: any[] = [
  HalClient,
  HalHttp,
  HalInstanceFactory,
  provide(HalResourceFactory, {
    useClass: HalHttpResourceFactory
  }),
  provide(HAL_COLLECTION_TRANSLATORS, {
    useClass: HalArrayTranslator,
    multi: true
  })
  provide(HAL_OBJECT_TRANSLATORS, {
    useClass: HalDefaultObjectTranslator,
    multi: true
  })
];

