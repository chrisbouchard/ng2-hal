import {bootstrap, Component} from 'angular2/angular2';
import {Character} from './model/character';
import {Card} from './ui/card';

@Component({
    selector: 'my-app',
    directives: [Card],
    template: `
      <div class="ui very padded container">
        <card [(character)]="character"></card>
      </div>
      `
})
class AppComponent {

  character: Character = {
    name: 'John Smith',
    portrait: './img/placeholder.svg'
    aspects: [
      { label: 'High Concept', name: 'Frobulator of Widgets' },
      { label: 'Trouble', name: 'Troublesome Past' }
    ],
    skills: {
      'Foo': 1,
      'Bar': 2,
      'Baz': 3
    }
  };

}

bootstrap(AppComponent);

