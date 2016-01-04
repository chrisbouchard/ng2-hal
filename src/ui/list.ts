import {NgFor} from 'angular2/common';
import {Component, Input, View} from 'angular2/core';

import {Character} from 'app/model/character';
import {Card} from './card';

@Component({
  selector: 'fate-list'
})
@View({
  directives: [Card, NgFor],
  template: require('./list.html')
})
export class List {
  @Input() characters: Character[];
}

