import { Type } from '@angular/core';

import { HalDefaultObjectTranslator } from './default-object-translator';

describe('HalDefaultObjectTranslator', () => {

  const translator = new HalDefaultObjectTranslator();

  const truthyTypes: any[] = [
    { type: undefined, name: 'undefined' },
    { type: null, name: 'null' }
  ];

  const falsyTypes: any[] = [
    { type: Array, name: 'Array' },
    { type: Boolean, name: 'Boolean' },
    { type: Number, name: 'Number' },
    { type: Object, name: 'Object' },
    { type: String, name: 'String' }
  ];

  for (const entry of truthyTypes) {
    it(`applies to the ${entry.name} type`, () => {
      const applies = translator.appliesTo(entry.type);
      expect(applies).toBeTruthy();
    });
  }

  for (const entry of falsyTypes) {
    it(`does not apply to the ${entry.name} type`, () => {
      const applies = translator.appliesTo(entry.type);
      expect(applies).toBeFalsy();
    });
  }

});

