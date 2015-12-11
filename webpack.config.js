var webpack = require('webpack');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var OccurenceOrderPlugin = webpack.optimize.OccurenceOrderPlugin;

module.exports = {
  devtool: 'source-map',
  debug: true,
  cache: true,
  verbose: true,
  displayErrorDetails: true,

  stats: {
    colors: true,
    reasons: true
  },

  entry: {
    'vendor': [
      // Angular 2 Deps
      'zone.js',
      'reflect-metadata',
      // to ensure these modules are grouped together in one file
      'angular2/angular2',
      'angular2/core',
      'angular2/router',
      'angular2/http',
      'babel-polyfill'
    ],
    'app': [
      './src/init'
    ]
  },

  output: {
    path: 'content/js',
    filename: '[name].js',
    sourceMapFilename: '[name].js.map'
  },

  resolve: {
    extensions: ['', '.ts', '.js']
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'babel!ts',
        exclude: [
          /\.min\.js$/,
          /\.spec\.ts$/,
          /\.e2e\.ts$/,
          /node_modules/
        ]
      }
    ]
  },

  plugins: [
    new OccurenceOrderPlugin(),
    // new webpack.optimize.UglifyJsPlugin(),
    new CommonsChunkPlugin({ name: 'vendor', minChunks: Infinity })
  ]
}

