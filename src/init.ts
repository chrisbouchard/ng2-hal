import {bootstrap, CORE_DIRECTIVES} from 'angular2/angular2';
import {App} from './app';

/* Load Semantic UI. */
import 'semantic/semantic';

/* DefinitelyTyped definition for jQuery conflicts with one of Angular's internal libaries. We'll require it without
 * type for now, until typings has a definition. */
var $: any = require('jquery');

$(() => bootstrap(App, [CORE_DIRECTIVES]));

