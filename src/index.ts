import {bootstrap} from 'angular2/platform/browser';
import {enableProdMode, provide} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {HashLocationStrategy, LocationStrategy, ROUTER_PROVIDERS} from 'angular2/router';

import {CharacterFacade} from './common/character_facade';
import {App} from './app/app';

import {HAL_PROVIDERS} from './hal';

import {__PRODUCTION__} from './globals.ts';

/* Load CSS stylesheets. */
import 'semantic/semantic.css';

/* Load packages for side-effects. */
import 'angular2/bundles/angular2-polyfills';
import 'babel-polyfill';
import 'jquery';
import 'rxjs/Rx';
import 'semantic/semantic';

if (__PRODUCTION__) {
  /* Switch Angular to production mode. */
  enableProdMode();
}
else {
  (window as any).jQuery = jQuery;
}

jQuery(() => {
  bootstrap(App, [
    CharacterFacade,
    HAL_PROVIDERS,
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    provide(LocationStrategy, {
      useClass: HashLocationStrategy
    })
  ]).catch(err => console.error(err));
});

