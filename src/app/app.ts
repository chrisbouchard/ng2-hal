import {Component, View} from 'angular2/core';
import {RouteConfig, RouterOutlet} from 'angular2/router';

import {CharacterPage} from '../character/character_page';
import {GroupPage} from '../group/group_page';
import {AppFrame} from './app_frame';

@Component({
  selector: 'fate-app',
  directives: [AppFrame, RouterOutlet],
  template: require('./app.html.haml')
})
@RouteConfig([
  { path: '/', component: GroupPage, name: 'Home' },
  { path: '/group/:id', component: GroupPage, name: 'Group' },
  { path: '/character/:id', component: CharacterPage, name: 'Character' },
  { path: '/player/:id', component: CharacterPage, name: 'Player' }
])
export class App {}

