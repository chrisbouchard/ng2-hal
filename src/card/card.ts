import {Component, Input, View} from 'angular2/core';
import {RouterLink} from 'angular2/router';

import {Character} from '../common/model';

@Component({
  selector: 'fate-card',
  directives: [RouterLink],
  template: require('./card.html.haml')
})
export class Card {
  @Input() character: Character;
}
