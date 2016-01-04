import {Component, Input, View} from 'angular2/core';
import {RouterLink} from 'angular2/router';

@Component({
  selector: 'fate-app-frame'
})
@View({
  styles: [`
    .fate-app-frame {
      padding-top: 20px;
    }
  `],
  template: require('./app_frame.html')
})
export class AppFrame {}

