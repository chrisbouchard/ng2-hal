(Error as any).stackTraceLimit = Infinity;

import 'babel-polyfill';
import 'reflect-metadata';

import 'zone.js/dist/zone';

import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';
import 'zone.js/dist/jasmine-patch';
import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/sync-test';

import { setBaseTestProviders } from '@angular/core/testing';
import { TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS, TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS }
  from '@angular/platform-browser-dynamic/testing';

setBaseTestProviders(
  TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,
  TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS
);

function requireAll<T>(requireContext: RequireContext): T[] {
  return requireContext.keys().map(requireContext);
}

const testContext = require.context('./src', true, /\.spec\.ts/);
requireAll(testContext);

