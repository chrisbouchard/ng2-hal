import {Component, Input, View} from 'angular2/core';
import {RouterLink} from 'angular2/router';

import {Character} from '../model/character';

@Component({
  selector: 'fate-sheet'
})
@View({
  template: require('./sheet.html.haml')
})
export class Sheet {
  @Input() character: Character;
}
