import { Type } from '@angular/core';

import { HalArrayTranslator } from './array-translator';

describe(`HalArrayTranslator`, () => {

  let translator: HalArrayTranslator;

  beforeEach(() => {
    translator = new HalArrayTranslator();
  });


  describe(`appliesTo`, () => {
    const truthyTypes: any[] = [
      { type: Array, name: 'Array' }
    ];

    const falsyTypes: any[] = [
      { type: undefined, name: 'undefined' },
      { type: null, name: 'null' },
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

  describe(`toArray`, () => {
    it(`translates array values`, () => {
      const value: any[] = [1, '2', true];
      const result = translator.toArray(value, Array);
      expect(result).toEqual(value);
    });

    it(`preserves nested objects`, () => {
      const value: any[] = [
        { a: 1, b: 2, c: 3 },
        { d: '1', e: '2', f: '3' },
        { g: true, h: false }
      ];

      const result = translator.toArray(value, Array);
      expect(result).toEqual(value);
    });
  });

  describe(`fromArray`, () => {
    it(`translates array values`, () => {
      const value: any[] = [1, '2', true];
      const result = translator.fromArray(value, Array);
      expect(result).toEqual(value);
    });

    it(`preserves nested objects`, () => {
      const value: any[] = [
        { a: 1, b: 2, c: 3 },
        { d: '1', e: '2', f: '3' },
        { g: true, h: false }
      ];

      const result = translator.fromArray(value, Array);
      expect(result).toEqual(value);
    });
  });

});


