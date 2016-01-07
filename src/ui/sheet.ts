import {Component, Input, View} from 'angular2/core';
import {RouterLink} from 'angular2/router';

import {Aspect, Character} from '../model/character';

@Component({
  selector: 'fate-sheet'
})
@View({
  template: require('./sheet.html.haml')
})
export class Sheet {
  @Input() character: Character;

  highConcept(): string {
    for (let aspect of this.character.aspects) {
      if (aspect.tags.has('high-concept')) {
        return aspect.name;
      }
    }

    return '';
  }
}
