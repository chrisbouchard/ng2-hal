import {Component, Input, View} from 'angular2/core';
import {RouterLink} from 'angular2/router';

import {COMMON_PIPES} from '../common/pipes';
import {Character, StressBox, Stunt} from '../model';

@Component({
  selector: 'fate-sheet',
  directives: [RouterLink],
  pipes: [COMMON_PIPES],
  styles: [require<string>('./sheet.less')],
  template: require<string>('./sheet.html.haml')
})
export class Sheet {
  @Input() character: Character;

  emptyStressBox: StressBox = { enabled: false, marked: false };

  namedAspect(slot: string): {title: string, name: string} {
    return {
      title: this.character.template.aspectNames.get(slot),
      name: this.character.namedAspects.get(slot).name
    };
  }
}

