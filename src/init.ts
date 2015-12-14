import {bootstrap, CORE_DIRECTIVES} from 'angular2/angular2';
import {App} from './app';

import * as $ from 'jquery';

/* Load Semantic UI. */
import 'semantic/semantic';

$(() => bootstrap(App, [CORE_DIRECTIVES]));

