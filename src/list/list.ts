import {Component, Input, View} from 'angular2/core';

import {Character} from '../common/model';
import {Card} from '../card/card';

@Component({
  selector: 'fate-list',
  directives: [Card],
  template: require('./list.html.haml')
})
export class List {
  @Input() characters: Array<Character>;
}

