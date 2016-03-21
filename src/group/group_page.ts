import {AsyncPipe} from 'angular2/common';
import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {Observable} from 'rxjs';

import {CharacterFacade} from '../common/character_facade';
import {List} from '../list/list';
import {Character} from '../model/character';

@Component({
  selector: 'fate-group-page',
  directives: [List],
  pipes: [AsyncPipe],
  template: require<string>('./group_page.html.haml')
})
export class GroupPage {

  characters: Observable<Array<Character>>;

  constructor(private params: RouteParams, private characterFacade: CharacterFacade) {
    this.characters = characterFacade.findAll();
  }

}

