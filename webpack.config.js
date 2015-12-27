var path = require('path');
var webpack = require('webpack');

var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var OccurenceOrderPlugin = webpack.optimize.OccurenceOrderPlugin;
var ProvidePlugin = webpack.ProvidePlugin;
// var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

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
      'zone.js',
      'reflect-metadata',
      'angular2/angular2',
      'angular2/core',
      'angular2/router',
      'angular2/http',
      'babel-polyfill',
    ],
    'app': 'app/init'
  },

  output: {
    path: path.resolve(__dirname, 'content/js'),
    filename: '[name].js',
    sourceMapFilename: '[name].js.map'
  },

  resolve: {
    alias: {
      'app': path.resolve(__dirname, 'src'),
      'semantic': path.resolve(__dirname, 'semantic/dist')
    },
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
      },
      {
        test: /\.html$/,
        loader: 'html?attrs=false&minimize=false'
      }
    ]
  },

  plugins: [
    new CommonsChunkPlugin('vendor', 'vendor.js'),
    new OccurenceOrderPlugin(),
    new ProvidePlugin({ 'jQuery': 'jquery', '$': 'jquery' }),
    // new UglifyJsPlugin({ compress: { warnings: false } })
  ]
}

