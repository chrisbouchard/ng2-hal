import {bootstrap, CORE_DIRECTIVES} from 'angular2/angular2';
import {App} from './app';

/* Load Semantic UI. */
import 'jquery';
import 'semantic/semantic';

/* Hook into jQuery, which is injected by webpack. */
declare var $: any;

/* Expose it to the window so we can see it for debugging. */
window['$'] = $;

$(() => bootstrap(App, [CORE_DIRECTIVES]));

