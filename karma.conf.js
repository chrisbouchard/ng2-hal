module.exports = function (config) {
  var webpack = require('./webpack.config.js');

  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      {pattern: 'spec-bundle.ts', watched: false}
    ],
    exclude: [],
    preprocessors: {
      'spec-bundle.ts': ['webpack', 'sourcemap']
    },
    webpack: webpack,
    webpackServer: {
      noInfo: true
    },
    reporters: ['mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    //singleRun: true
  });
}

