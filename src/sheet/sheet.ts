import {Component, Input} from 'angular2/core';
import {RouterLink} from 'angular2/router';

import {autobind} from 'core-decorators';

import {COMMON_PIPES} from '../common/pipes';
import {Character} from '../model/character';
import {StressBox} from '../model/stress_track';
import {Stunt} from '../model/stunt';

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

  @autobind
  namedAspect(slot: string): {title: string, name: string} {
    return {
      title: this.character.template.aspectNames.get(slot),
      name: this.character.namedAspects.get(slot).name
    };
  }
}

