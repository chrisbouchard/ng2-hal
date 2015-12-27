import {Component, View} from 'angular2/angular2';
import {CharacterFacade} from './facade/character_facade';
import {Character} from './model/character';
import {List} from './ui/list';

@Component({
  selector: 'fate-app'
})
@View({
  directives: [List],
  template: `<fate-list [characters]="characters"></fate-list>`
})
export class App {

  characters: Character[] = [];

  constructor(characterFacade: CharacterFacade) {
    characterFacade.findAll().then(characters => {
      this.characters = characters;
    });
  }

}

