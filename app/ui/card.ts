import {Component, CORE_DIRECTIVES} from 'angular2/angular2';
import {Character} from '../model/character';

@Component({
    selector: 'card',
    properties: ['character: character'],
    directives: [CORE_DIRECTIVES],
    template: `
    <h1>{{character.name}}</h1>
    <h2>{{character.aspects[0].name}}</h2>
      `
})
export class Card {
  character: Character;
}

