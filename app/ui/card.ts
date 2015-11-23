import {Component, CORE_DIRECTIVES} from 'angular2/angular2';
import {Character} from '../model/character';

@Component({
    selector: 'card',
    properties: ['character: character'],
    directives: [CORE_DIRECTIVES],
    template: `
      <div class="ui card">
        <div class="image">
          <img [src]="character.portrait">
        </div>
        <div class="content">
          <a class="header">{{character.name}}</a>
        </div>
      </div>
      `
})
export class Card {
  character: Character;
}

