module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-webpack');

  var path = require('path');
  var webpack = require('webpack');
  var webpackConfig = require('./webpack.config.js');

  grunt.initConfig({
    'webpack': {
      options: webpackConfig,

      'build': {
        plugins: webpackConfig.plugins.concat(
          new webpack.optimize.DedupePlugin(),
          new webpack.optimize.UglifyJsPlugin()
        )
      },

      'build-dev': {
        devtool: 'sourcemap',
        debug: true
      }
    },

    'webpack-dev-server': {
      options: {
        webpack: webpackConfig,
        contentBase: 'content',
        publicPath: '/' + webpackConfig.output.publicPath
      },

      start: {
        keepAlive: true,
        webpack: {
          devtool: 'eval',
          debug: true
        }
      }
    }
  });

};
