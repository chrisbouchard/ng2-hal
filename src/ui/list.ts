import {Component, Input, View} from 'angular2/core';

import {Character} from 'app/model/character';
import {Card} from './card';

@Component({
  selector: 'fate-list'
})
@View({
  directives: [Card],
  template: require('./list.html.haml')
})
export class List {
  @Input() characters: Character[];
}

