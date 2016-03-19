var path = require('path');
var webpack = require('webpack');

var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var DefinePlugin = webpack.DefinePlugin;
var ProvidePlugin = webpack.ProvidePlugin;

var DedupePlugin = webpack.optimize.DedupePlugin;
var OccurenceOrderPlugin = webpack.optimize.OccurenceOrderPlugin;
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

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
    ],
    'vendor': [
      'angular2/bundles/angular2-polyfills',
      'angular2/common',
      'angular2/core',
      'angular2/http',
      'angular2/platform/browser',
      'angular2/router',
      'babel-polyfill',
      'jquery'
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
      },
      {
        test: /\.css$/,
        loader: 'css',
        include: [path.join(__dirname, 'src')]
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css'),
        exclude: [path.join(__dirname, 'src')]
      },
      {
        test: /\.html.haml$/,
        loader: 'haml-haml'
      },
      {
        test: /\.html$/,
        loader: 'html?attrs=false&minimize=false'
      },
      {
        test: /\.less$/,
        loader: 'raw!less'
      },
      {
        test: /\.(eot|png|svg|ttf|woff|woff2)$/,
        loader: 'url?limit=5000&name=assets/[name]-[hash].[ext]'
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
    new CommonsChunkPlugin('vendor', 'vendor.js'),
    new DefinePlugin({
      __PRODUCTION__: JSON.stringify(isProduction())
    }),
    new ExtractTextPlugin('vendor.css'),
    new HtmlWebpackPlugin({
      inject: 'head',
      template: './src/index.html.haml'
    }),
    new ProvidePlugin({ 'jQuery': 'jquery', '$': 'jquery' }),
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

