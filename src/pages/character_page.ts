import {Component, View} from 'angular2/core';
import {RouteParams} from 'angular2/router';

import {CharacterFacade} from 'app/facade/character_facade';
import {Character} from 'app/model/character';

@Component({
  selector: 'fate-character-page'
})
@View({
  template: require('./character_page.html.haml')
})
export class CharacterPage {

  id: string = undefined;
  character: Character = undefined;

  constructor(params: RouteParams, characterFacade: CharacterFacade) {
    this.id = params.get('id');

    characterFacade.find(this.id).then(character => {
      this.character = character;
    });
  }

}

