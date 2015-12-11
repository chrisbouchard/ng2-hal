import {Component, CORE_DIRECTIVES, Input, View} from 'angular2/angular2';
import {Aspect, Character} from '../model/character';

@Component({
  selector: 'fate-card'
})
@View({
  directives: [CORE_DIRECTIVES],
  template: `
    <div class="ui {{character.color}} card">
      <div class="image">
        <img [src]="character.portrait">
      </div>
      <div class="content">
        <a class="header">{{character.name}}</a>
        <div class="ui small list">
          <div class="item" *ngFor="#aspect of character.aspects">
            <i class="{{aspect.icon}} icon"></i>
            <div class="content">{{aspect.name}}</div>
          </div>
        </div>
      </div>
    </div>
    `
})
export class Card {
  @Input() character: Character;

  highConcept(): Aspect {
    for (let aspect of this.character.aspects) {
      if (aspect.tags.has('high-concept')) {
        return aspect;
      }
    }

    return undefined;
  }
}
