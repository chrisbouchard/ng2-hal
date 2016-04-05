require('angular2/bundles/angular2-polyfills');
require('babel-polyfill');
require('jquery');
require('rxjs/Rx');
require('semantic/semantic');

require('zone.js/dist/jasmine-patch');

var testing = require('angular2/testing');
var browser = require('angular2/platform/testing/browser');

testing.setBaseTestProviders(
  browser.TEST_BROWSER_PLATFORM_PROVIDERS,
  browser.TEST_BROWSER_APPLICATION_PROVIDERS
);

Object.assign(global, testing);

var testContext = require.context('./src', true, /\.spec\.ts/);
var modules = requireAll(testContext);

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

