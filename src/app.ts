import {Component, View} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {CharacterPage} from './pages/character_page';
import {GroupPage} from './pages/group_page';

@Component({
  selector: 'fate-app'
})
@View({
  directives: [ROUTER_DIRECTIVES, CharacterPage, GroupPage],
  styles: [`
    .fate-app {
      padding-top: 20px;
    }
  `],
  template: `
    <div class="fate-app">
      <router-outlet></router-outlet>
    </div>
  `
})
@RouteConfig([
  { path: '/', component: GroupPage, name: 'Home' },
  { path: '/group/:id', component: GroupPage, name: 'Group' },
  { path: '/character/:id', component: CharacterPage, name: 'Character' }
])
export class App {}

