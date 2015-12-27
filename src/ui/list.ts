import {Component, Input, View} from 'angular2/angular2';
import {Character} from 'app/model/character';
import {Card} from './card';

@Component({
  selector: 'fate-list'
})
@View({
  directives: [Card],
  template: require('./list.html')
})
export class List {
  @Input() characters: Character[];
}

