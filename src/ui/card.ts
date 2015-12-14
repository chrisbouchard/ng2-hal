import {Component, Input, View} from 'angular2/angular2';
import {Aspect, Character} from '../model/character';

@Component({ selector: 'fate-card' })
@View({ template: require('./card.html') })
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
