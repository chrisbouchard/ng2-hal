# FATE Character Sheet 2.0

An [Angular2](https://angular.io/) application to manage [FATE](http://www.evilhat.com/home/fate-core/) character sheets.

## Building

First `cd` into the project root and install the node dependencies.
```console
$ npm install
```

And the global node dependencies.
```console
$ npm install --global gulp grunt-cli
```

Once they're installed, you'll need to delete the contents of one of the Angular 2 typescript files.
```console
$ echo >node_modules/angular2/typings/es6-shim/es6-shim.d.ts
```
This is currently required due to [angular/angular#5973](//github.com/angular/angular/issues/5973). The typings for `es6-shim` that ship with Angular 2 conflict with the ones shipped with TypeScript when `tsc` is configured with `target` as `es6` (which we do).

Next build Semantic-UI using `gulp`.
```console
$ cd semantic
$ gulp build
$ cd ..
```

Finally, build the project itself with `grunt`.
```console
$ grunt webpack:build      # Production
$ grunt webpack:build-dev  # Development
$ grunt webpack-dev-server # Live development server
```

The compiled bundles and assets will wind up in `content/dist`. The app may be run with any static http server with `content` as the webroot.

# Related Projects
* [Angular](//github.com/angular/angular) as the core framework to build components.
* [Babel](//github.com/babel/babel) to transpile ES6 output from `tsc` down to ES5.
* [Haml](//github.com/haml/haml) to write templates more succinctly.
* [Less](//github.com/less/less.js) to write styles more succinctly.
* [Semantic-UI](//github.com/Semantic-Org/Semantic-UI) as the main style and layout library.
* [Typescript](//github.com/Microsoft/TypeScript) to write type-aware JavaScript for components and services.
* [Webpack](//github.com/webpack/webpack) to bundle everything and run all the compilers/transpilers.
