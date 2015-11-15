import {bootstrap, Component, ViewEncapsulation} from 'angular2/angular2';

@Component({
    selector: 'my-app',
    template: '<h1>My First Angular 2 App</h1>',
    encapsulation: ViewEncapsulation.Native,
    styles: [ 'h1 { color: red; }' ]
})
class AppComponent { }

bootstrap(AppComponent);

