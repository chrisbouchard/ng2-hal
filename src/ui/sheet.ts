import {Component, Input, View} from 'angular2/core';
import {RouterLink} from 'angular2/router';

import {Character} from '../model/character';

import {EntriesPipe} from '../pipes/entries_pipe';
import {IndexedPipe} from '../pipes/indexed_pipe';
import {ReversedPipe} from '../pipes/reversed_pipe';

@Component({
  selector: 'fate-sheet'
})
@View({
  directives: [RouterLink],
  pipes: [EntriesPipe, IndexedPipe, ReversedPipe],
  styles: [require('./sheet.less')],
  template: require('./sheet.html.haml')
})
export class Sheet {
  @Input() character: Character;
}
