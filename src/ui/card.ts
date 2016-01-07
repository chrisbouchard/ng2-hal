import {Component, Input, View} from 'angular2/core';
import {RouterLink} from 'angular2/router';

import {Character} from '../model/character';

@Component({
  selector: 'fate-card'
})
@View({
  directives: [RouterLink],
  template: require('./card.html.haml')
})
export class Card {
  @Input() character: Character;
}
