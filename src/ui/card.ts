import {Component, Input, View} from 'angular2/core';
import {RouterLink} from 'angular2/router';

import {Aspect, Character} from 'app/model/character';

@Component({
  selector: 'fate-card'
})
@View({
  directives: [RouterLink],
  template: require('./card.html')
})
export class Card {
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
