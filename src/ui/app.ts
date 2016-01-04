import {Component, View} from 'angular2/angular2';
import {CharacterFacade} from 'app/facade/character_facade';
import {Character} from 'app/model/character';
import {List} from './list';

@Component({
  selector: 'fate-app'
})
@View({
  directives: [List],
  styles: [
    `.fate-app { padding-top: 20px; }`
  ],
  template: `
    <div class="fate-app">
      <fate-list [characters]="characters"></fate-list>
    </div>
  `
})
export class App {

  characters: Character[] = [];

  constructor(characterFacade: CharacterFacade) {
    characterFacade.findAll().then(characters => {
      this.characters = characters;
    });
  }

}

