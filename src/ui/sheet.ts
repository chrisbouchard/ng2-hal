import {Component, Input, View} from 'angular2/core';
import {RouterLink} from 'angular2/router';

import {Character} from '../model/character';

import {EntriesPipe} from '../pipes/entries_pipe';

@Component({
  selector: 'fate-sheet'
})
@View({
  pipes: [EntriesPipe],
  template: require('./sheet.html.haml')
})
export class Sheet {
  @Input() character: Character;
}
