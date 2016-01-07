import {AsyncPipe} from 'angular2/common';
import {Component, View} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {Observable} from 'rxjs';

import {CharacterFacade} from 'app/facade/character_facade';
import {Character} from 'app/model/character';

@Component({
  selector: 'fate-character-page'
})
@View({
  pipes: [AsyncPipe],
  template: require('./character_page.html.haml')
})
export class CharacterPage {

  id: string = undefined;
  character: Observable<Character>;

  constructor(private params: RouteParams, private characterFacade: CharacterFacade) {}

  ngOnInit() {
    this.id = this.params.get('id');
    this.character = this.characterFacade.find(this.id);
  }

}

