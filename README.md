# `ng2-hal`: HAL for Angular 2

An [Angular 2](https://angular.io/) library to interact with REST services that use HAL.

## Building

First `cd` into the project root and install the node dependencies.
```console
$ npm install
```

And install `gulp` globally.
```console
$ npm install --global gulp
```

Finally, build the project with `gulp`.
```console
$ gulp build  # Production
$ gulp server # Live development server
```

The compiled bundles will wind up in `dist`.

## Testing

Automated tests are run using `gulp`. The following command will run all tests once.
```console
$ gulp test
```

Tests can also be run continuously.
```console
$ gulp ci
```

## Related Projects

The following projects are used by FATE Character Sheet:

* [Angular](//github.com/angular/angular) as the core framework to build components.
* [Babel](//github.com/babel/babel) to transpile ES6 output from `tsc` down to ES5.
* [Gulp](//github.com/gulpjs/gulp) to manage the build process.
* [Jasmine](//github.com/jasmine/jasmine) to write unit tests.
* [Karma](//github.com/karma-runner/karma) to run automated tests.
* [Typescript](//github.com/Microsoft/TypeScript) to write type-aware JavaScript for components and services.
* [Webpack](//github.com/webpack/webpack) to bundle everything and run all the compilers/transpilers.

