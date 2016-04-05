var path = require('path');
var webpack = require('webpack');

var DefinePlugin = webpack.DefinePlugin;

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
    'app': [
      './src'
    ]
  },

  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
    publicPath: '',
    sourceMapFilename: '[name].js.map'
  },

  resolve: {
    alias: {
      'semantic': path.join(__dirname, 'semantic/dist')
    },
    extensions: ['', '.ts', '.js']
  },

  module: {
    preLoaders: [
      {
        test: /\.ts$/,
        loader: 'tslint',
        exclude: [/node_modules/]
      }
    ],
    loaders: [
      {
        test: /\.ts$/,
        loader: 'babel!ts',
        exclude: [/node_modules/]
      }
    ],
    noParse: [
      path.join(__dirname, 'node_modules', 'angular2', 'bundles')
    ]
  },

  plugins: [
    ...commonPlugins(),
    ...productionPlugins()
  ]
}

function devtool() {
  if (!isProduction()) {
    return undefined;
  }

  return '#cheap-module-eval-source-map';
}

function commonPlugins() {
  return [
    new DefinePlugin({
      __PRODUCTION__: JSON.stringify(isProduction())
    })
  ];
}

function productionPlugins() {
  if (!isProduction()) {
    return [];
  }

  return [
    new DedupePlugin(),
    new OccurenceOrderPlugin(),
    // TODO: Figure out how to enable this without breaking things.
    new UglifyJsPlugin()
  ];
}

function isProduction() {
  return process.env.NODE_ENV === 'production';
}

