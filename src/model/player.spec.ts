import {describe, expect, it} from 'angular2/testing';

import {Player} from './player';

describe('Player', () => {
  it('has its id given in the constructor', () => {
    let player = new Player({id: '1', name: 'test'});
    expect(player.id).toEqual('1');
  });

  it('has its name given in the constructor', () => {
    let player = new Player({id: '1', name: 'test'});
    expect(player.name).toEqual('test');
  });
});


