import {bootstrap} from 'angular2/platform/browser';
import {enableProdMode, provide} from 'angular2/core';
import {HashLocationStrategy, LocationStrategy, ROUTER_PROVIDERS} from 'angular2/router';

import {CharacterFacade} from './facade/character_facade';
import {App} from './app';

/* Load CSS stylesheets. */
import 'semantic/semantic.css';

/* Load packages for side-effects. */
import 'jquery';
import 'semantic/semantic';
import 'angular2/bundles/angular2-polyfills';

/* Hook into jQuery, which is injected by webpack. */
declare var $: any;

/* Declare the constant defined by webpack. */
declare const __PRODUCTION__: boolean;

if (__PRODUCTION__) {
  /* Switch Angular to production mode. */
  enableProdMode();
}
else {
  /* Expose it to the window so we can see it for debugging. */
  window['$'] = $;
}

$(() => {
  bootstrap(App, [
    CharacterFacade,
    ROUTER_PROVIDERS,
    provide(LocationStrategy, {
      useClass: HashLocationStrategy
    })
  ]).catch(err => console.error(err));
});

