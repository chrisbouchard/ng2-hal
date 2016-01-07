import {AsyncPipe} from 'angular2/common';
import {Component, View} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {Observable} from 'rxjs';

import {CharacterFacade} from 'app/facade/character_facade';
import {Character} from 'app/model/character';
import {List} from 'app/ui/list';

@Component({
  selector: 'fate-group-page'
})
@View({
  directives: [List],
  pipes: [AsyncPipe],
  template: require('./group_page.html.haml')
})
export class GroupPage {

  id: string = undefined;
  characters: Observable<Character[]>;

  constructor(private params: RouteParams, private characterFacade: CharacterFacade) {}

  ngOnInit() {
    this.id = this.params.get('id');
    this.characters = this.characterFacade.findAll();
  }

}

