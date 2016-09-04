import { Type } from '@angular/core';

import { HalDefaultObjectTranslator } from './default-object-translator';

describe(`HalDefaultObjectTranslator`, () => {

  let translator: HalDefaultObjectTranslator;

  beforeEach(() => {
    translator = new HalDefaultObjectTranslator();
  });


  describe(`appliesTo`, () => {
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

  describe(`toObject`, () => {
    it(`translates flat object values`, () => {
      const value: any = { foo: 1, bar: '2', baz: true };
      const result = translator.toObject(value, Object);
      expect(result).toEqual(value);
    });

    it(`preserves nested objects`, () => {
      const value: any = {
        foo: { a: 1, b: 2, c: 3 },
        bar: { d: '1', e: '2', f: '3' },
        baz: { g: true, h: false }
      };

      const result = translator.toObject(value, Object);
      expect(result).toEqual(value);
    });
  });

  describe(`fromObject`, () => {
    it(`translates flat object values`, () => {
      const value: any = { foo: 1, bar: '2', baz: true };
      const result = translator.fromObject(value, Object);
      expect(result).toEqual(value);
    });

    it(`preserves nested objects`, () => {
      const value: any = {
        foo: { a: 1, b: 2, c: 3 },
        bar: { d: '1', e: '2', f: '3' },
        baz: { g: true, h: false }
      };

      const result = translator.fromObject(value, Object);
      expect(result).toEqual(value);
    });

    it(`uses the given constructor`, () => {
      class Foo {
        constructor(public a: number, public b: string) {}
      };

      const value: any = { a: 1, b: '2' };
      const result = translator.fromObject(value, Foo);

      expect(result).toEqual(jasmine.any(Foo));
      expect(result.a).toEqual(value.a);
      expect(result.b).toEqual(value.b);
    });
  });

});

