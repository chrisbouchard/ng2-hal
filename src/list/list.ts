import {Component, Input, View} from 'angular2/core';

import {Card} from '../card/card';
import {Character} from '../model';

@Component({
  selector: 'fate-list',
  directives: [Card],
  template: require<string>('./list.html.haml')
})
export class List {
  @Input() characters: Array<Character>;
}

