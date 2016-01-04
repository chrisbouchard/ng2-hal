import {Component, View} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {CharacterPage} from './pages/character_page';
import {GroupPage} from './pages/group_page';
import {AppFrame} from './ui/app_frame';

@Component({
  selector: 'fate-app'
})
@View({
  directives: [AppFrame, ROUTER_DIRECTIVES],
  template: `
    <fate-app-frame>
      <router-outlet></router-outlet>
    </fate-app-frame>
  `
})
@RouteConfig([
  { path: '/', component: GroupPage, name: 'Home' },
  { path: '/group/:id', component: GroupPage, name: 'Group' },
  { path: '/character/:id', component: CharacterPage, name: 'Character' }
])
export class App {}

