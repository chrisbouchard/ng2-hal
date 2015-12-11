import {Component, View} from 'angular2/angular2';
import {Aspect, Character} from './model/character';
import {Card} from './ui/card';

@Component({
  selector: 'fate-app'
})
@View({
  directives: [Card],
  template: `
    <div class="ui very padded container">
      <fate-card [(character)]="character"></fate-card>
    </div>
    `
})
export class App {

  character = new Character(
    'Amaryllis Aster Jennings',
    './img/placeholder.svg',
    'purple',
    new Set([
      new Aspect('Graying Starfleet Devil', new Set<string>()),
      new Aspect('Number One', new Set<string>()),
      new Aspect('Captain', new Set<string>()),
      new Aspect('To Boldly Go', new Set<string>()),
      new Aspect('Warp Core on Legs', new Set<string>()),
      new Aspect('Glint in the Eye', new Set<string>())
    ]),
    new Map<string, number>()
      .set('Foo', 1)
      .set('Bar', 2)
      .set('Baz', 3)
  );

}

