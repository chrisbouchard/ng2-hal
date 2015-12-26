import {Component, ElementRef, Input, View} from 'angular2/angular2';
import {Aspect, Character} from 'app/model/character';

/* Hook into jQuery, which is injected by webpack. */
declare var $: any;

@Component({ selector: 'fate-card' })
@View({ template: require('./card.html') })
export class Card {
  @Input() character: Character;

  constructor(element: ElementRef) {
    setTimeout(() => {
      var el: any = element.nativeElement;
      console.log('el: ', el);

      var dimmers: any = $(el).find('.fate-card-front').find('.image');
      console.log('dimmers: ', dimmers);

      dimmers.dimmer({ on: 'hover' });
    }, 0);
  }

  highConcept(): string {
    for (let aspect of this.character.aspects) {
      if (aspect.tags.has('high-concept')) {
        return aspect.name;
      }
    }

    return '';
  }
}
