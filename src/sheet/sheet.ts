import {Component, Input, View} from 'angular2/core';
import {RouterLink} from 'angular2/router';

import {Character, StressTrack, Stunt} from '../common/model';
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

  stressBoxes(field: string): StressTrack {
    if (!this.character) return [];
    return this.character.stressTracks.get(field) || [];
  }
}
