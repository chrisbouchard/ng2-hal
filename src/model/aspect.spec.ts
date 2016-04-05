import {describe, expect, it} from 'angular2/testing';

import {Aspect} from './aspect';

describe('Aspect', () => {
  it('has its name given in the constructor', () => {
    let aspect = new Aspect('test');
    expect(aspect.name).toEqual('test');
  });
});

