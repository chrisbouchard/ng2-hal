import {Component, Input, View} from 'angular2/core';
import {RouterLink} from 'angular2/router';

import {Character} from '../model';

@Component({
  selector: 'fate-card',
  directives: [RouterLink],
  template: require<string>('./card.html.haml')
})
export class Card {
  @Input() character: Character;
}
