var path = require('path');
var webpack = require('webpack');

var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var DefinePlugin = webpack.DefinePlugin;
var OccurenceOrderPlugin = webpack.optimize.OccurenceOrderPlugin;
var ProvidePlugin = webpack.ProvidePlugin;

var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  cache: true,
  verbose: true,
  displayErrorDetails: true,

  stats: {
    colors: true,
    reasons: true
  },

  entry: {
    'app': './src/init',
    'vendor': [
      'angular2/bundles/angular2-polyfills',
      'angular2/common',
      'angular2/core',
      'angular2/http',
      'angular2/platform/browser',
      'angular2/router'
    ]
  },

  output: {
    path: path.join(__dirname, 'content/dist'),
    publicPath: '/dist',
    filename: '[name].js',
    sourceMapFilename: '[name].js.map'
  },

  resolve: {
    alias: {
      'semantic': path.join(__dirname, 'semantic/dist')
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
          /node_modules\//
        ]
      },
      {
        test: /\.css$/,
        loader: 'css',
        include: [
          path.join(__dirname, 'src')
        ]
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css'),
        exclude: [
          path.join(__dirname, 'src')
        ]
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
        loader: 'url?limit=5000&name=/assets/[hash].[ext]'
      }
    ],
    noParse: [
      path.join(__dirname, 'node_modules', 'angular2', 'bundles')
    ]
  },

  plugins: [
    new CommonsChunkPlugin('vendor', 'vendor.js'),
    new DefinePlugin({
        __PRODUCTION__: JSON.stringify(process.env.NODE_ENV === 'production')
    }),
    new ExtractTextPlugin('vendor.css'),
    new OccurenceOrderPlugin(),
    new ProvidePlugin({ 'jQuery': 'jquery', '$': 'jquery' })
  ]
}

