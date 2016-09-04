import { Type } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';

import { HalInstanceFactory } from './instance-factory';
import { HAL_COLLECTION_TRANSLATORS, HAL_OBJECT_TRANSLATORS, HalCollectionTranslator, HalObjectTranslator,
  HalTranslator } from './translator';

describe(`HalInstanceFactory`, () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HalInstanceFactory
      ]
    });
  });

  describe(`createInstance`, () => {
    it(`should handle undefined`, () => {
      TestBed.configureTestingModule({
        providers: []
      });

      inject([HalInstanceFactory], (factory: HalInstanceFactory) => {
      });
    });
  });

});



