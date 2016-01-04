import {Component, View} from 'angular2/core';

import {CharacterFacade} from 'app/facade/character_facade';
import {Character} from 'app/model/character';
import {List} from 'app/ui/list';

@Component({
  selector: 'fate-group-page'
})
@View({
  directives: [List],
  template: require('./group_page.html')
})
export class GroupPage {

  characters: Character[] = [];

  constructor(characterFacade: CharacterFacade) {
    characterFacade.findAll().then(characters => {
      this.characters = characters;
    });
  }

}

