import { HalDefaultObjectTranslator } from './default-object-translator';

describe('HalDefaultObjectTranslator', () => {

  const translator = new HalDefaultObjectTranslator();

  it('applies to the undefined type', () => {
    const applies = translator.appliesTo(undefined);
    expect(applies).toBeTruthy();
  });

  it('applies to the null type', () => {
    const applies = translator.appliesTo(null);
    expect(applies).toBeTruthy();
  });

  it('does not apply to the Object type', () => {
    const applies = translator.appliesTo(Object);
    expect(applies).toBeFalsy();
  });

  it('does not apply to the Array type', () => {
    const applies = translator.appliesTo(Array);
    expect(applies).toBeFalsy();
  });

});

