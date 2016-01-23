import {AsyncPipe} from 'angular2/common';
import {Component, View} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {Observable} from 'rxjs';

import {CharacterFacade} from '../facade/character_facade';
import {Character} from '../model/character';
import {List} from '../ui/list';

@Component({
  selector: 'fate-group-page',
  directives: [List],
  pipes: [AsyncPipe],
  template: require('./group_page.html.haml')
})
export class GroupPage {

  characters: Observable<Array<Character>>;

  constructor(private params: RouteParams, private characterFacade: CharacterFacade) {
    this.characters = characterFacade.findAll();
  }

}

