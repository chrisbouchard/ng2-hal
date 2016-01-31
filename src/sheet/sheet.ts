import {Component, Input, View} from 'angular2/core';
import {RouterLink} from 'angular2/router';

import {Character, StressBox, Stunt} from '../common/model';
import {COMMON_PIPES} from '../common/pipes';

@Component({
  selector: 'fate-sheet',
  directives: [RouterLink],
  pipes: [COMMON_PIPES],
  styles: [require('./sheet.less')],
  template: require('./sheet.html.haml')
})
export class Sheet {
  @Input() character: Character;

  emptyStressBox: StressBox = { enabled: false, marked: false };
}

