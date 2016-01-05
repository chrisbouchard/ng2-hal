import {Component, View} from 'angular2/core';
import {RouterLink} from 'angular2/router';

import {AppMenu} from './app_menu';

@Component({
  selector: 'fate-app-frame'
})
@View({
  directives: [AppMenu],
  styles: [require('./app_frame.less')],
  template: require('./app_frame.html')
})
export class AppFrame {}

