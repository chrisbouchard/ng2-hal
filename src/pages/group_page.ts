import {Component, View} from 'angular2/core';
import {RouteParams} from 'angular2/router';

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

  id: string = undefined;
  characters: Character[] = [];

  constructor(params: RouteParams, characterFacade: CharacterFacade) {
    this.id = params.get('id');

    characterFacade.findAll().then(characters => {
      this.characters = characters;
    });
  }

}

