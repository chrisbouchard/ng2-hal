import {Component, OnInit, View} from 'angular2/core';
import {RouteConfig, RouterLink, RouterOutlet} from 'angular2/router';

import {HalClient, HalEmbedded, HalLinked, HalResource} from '../hal';

import {CharacterPage} from '../character/character_page';
import {GroupPage} from '../group/group_page';

class Foo {
  foo: number;
  bar: string[];
  baz: string;

  @HalLinked(Foo)
  blah: HalResource<Foo>;

  @HalEmbedded(Foo)
  blarg: Foo;
}

@Component({
  selector: 'body',
  directives: [RouterLink, RouterOutlet],
  styles: [require<string>('./app.less')],
  template: require<string>('./app.html.haml'),
})
@RouteConfig([
  { path: '/', component: GroupPage, name: 'Home' },
  { path: '/group/:id', component: GroupPage, name: 'Group' },
  { path: '/character/:id', component: CharacterPage, name: 'Character' },
  { path: '/player/:id', component: CharacterPage, name: 'Player' }
])
export class App implements OnInit {
  constructor(private client: HalClient) {}

  ngOnInit() {
    let resource: HalResource<Foo> = this.client.resource("http://localhost:8080/test.json", Foo);
    resource.get().subscribe(foo => {
      console.log(foo);
      foo.blah.get().subscribe(foo2 => {
        console.log(foo2);
      });
    });
  }
}

