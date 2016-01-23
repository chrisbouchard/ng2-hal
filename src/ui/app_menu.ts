import {Component, View} from 'angular2/core';
import {RouterLink} from 'angular2/router';

@Component({
  selector: 'fate-app-menu',
  directives: [RouterLink],
  template: require('./app_menu.html.haml')
})
export class AppMenu {}


