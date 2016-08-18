var path = require('path');
var webpack = require('webpack');

var DedupePlugin = webpack.optimize.DedupePlugin;
var OccurenceOrderPlugin = webpack.optimize.OccurenceOrderPlugin;
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

module.exports = {
  verbose: true,
  displayErrorDetails: true,
  devtool: devtool(),

  stats: {
    colors: true,
    reasons: true
  },

  entry: {
    'ng2-hal': ['./src']
  },

  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
    publicPath: '',
    sourceMapFilename: '[name].js.map'
  },

  resolve: {
    extensions: ['', '.ts', '.js']
  },

  module: {
    preLoaders: [
      {
        test: /\.ts$/,
        loader: 'tslint',
        exclude: [path.join(__dirname, 'node_modules')]
      }
    ],

    loaders: [
      {
        test: /\.ts$/,
        loader: 'babel!ts',
        exclude: [path.join(__dirname, 'node_modules')]
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: [
          path.join(__dirname, 'node_modules'),
          path.join(__dirname, 'semantic')
        ]
      }
    ],

    noParse: [
      path.join(__dirname, 'node_modules', 'zone.js'),
      path.join(__dirname, 'node_modules', 'reflect-metadata')
    ]
  },

  plugins: [
    ...productionPlugins()
  ]
}

function devtool() {
  if (!isProduction()) {
    return undefined;
  }

  return '#cheap-module-eval-source-map';
}

function productionPlugins() {
  if (!isProduction()) {
    return [];
  }

  return [
    new DedupePlugin(),
    new OccurenceOrderPlugin(),
    new UglifyJsPlugin()
  ];
}

function isProduction() {
  return process.env.NODE_ENV === 'production';
}

