module.exports = function (config) {
  var webpackConfig = require('./webpack.config.js')({
    profile: 'test'
  });

  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: ['./test/index.ts'],
    preprocessors: {
      './test/index.ts': ['webpack']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
    reporters: ['mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS']
  });
}

