import {bootstrap, CORE_DIRECTIVES} from 'angular2/angular2';
import {App} from './app';

/* Load Semantic UI. */
import 'semantic/semantic';

/* Hook into jQuery, which is injected by webpack. */
declare var $: any;

$(() => bootstrap(App, [CORE_DIRECTIVES]));

