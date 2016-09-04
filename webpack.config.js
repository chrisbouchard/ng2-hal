var webpack = require('webpack');

var DedupePlugin = webpack.optimize.DedupePlugin;
var OccurenceOrderPlugin = webpack.optimize.OccurenceOrderPlugin;

module.exports = {
  verbose: true,
  displayErrorDetails: true,

  stats: {
    colors: true,
    reasons: true
  },

  entry: {
    'index': ['./index.ts']
  },

  output: {
    filename: '[name].js',
    path: './dist',
    sourceMapFilename: '[name].js.map',
    libraryTarget: 'umd'
  },

  resolve: {
    extensions: ['', '.ts', '.js']
  },

  module: {
    preLoaders: [
      {
        test: /\.ts$/,
        loader: 'tslint',
        exclude: ['./node_modules']
      }
    ],

    loaders: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
        exclude: ['./node_modules']
      }
    ]
  },

  plugins: [
    new DedupePlugin(),
    new OccurenceOrderPlugin(),
  ]
}

