var path = require('path');
var nodeExternals = require('webpack-node-externals');
var webpack = require('webpack');

var UnminifiedWebpackPlugin = require('unminified-webpack-plugin');

var { DefinePlugin } = webpack;

var { UglifyJsPlugin } = webpack.optimize;

const defaultEnv = {
  profile: "development",
};

module.exports = (env = defaultEnv) => ({
  entry: {
    'ng2-hal': ['./src']
  },

  target: 'node',
  externals: [nodeExternals()],

  output: {
    filename: filename(env),
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, 'dist')
  },

  stats: stats(env),

  resolve: {
    extensions: ['.ts', '.js']
  },

  module: {
    rules: [
      {
        include: path.resolve(__dirname, 'src'),
        rules: [
          {
            test: /\.ts$/,
            use: [
              {
                loader: 'awesome-typescript-loader',
                options: {
                  useBabel: true,
                  useCache: true
                }
              },
              { loader: 'tslint-loader' }
            ]
          },
          {
            test: /\.js$/,
            loader: 'babel-loader'
          }
        ]
      }
    ]
  },

  plugins: [
    ...commonPlugins(env),
    ...productionPlugins(env)
  ]
});


function devtool(env) {
  if (isProduction(env)) {
    return 'hidden-source-map';
  }

  return 'source-map';
}

function filename(env) {
  if (isProduction(env)) {
    return '[name].min.js';
  }

  return '[name].js';
}

function stats(env) {
  return {
    children: false,
    chunks: false,
    colors: true,
    hash: false,
    timings: true,
    version: false
  };
}

function commonPlugins(env) {
  return [
    new DefinePlugin({
      __PRODUCTION__: JSON.stringify(isProduction(env))
    })
  ];
}

function productionPlugins(env) {
  if (!isProduction(env)) {
    return [];
  }

  return [
    new UglifyJsPlugin(),
    new UnminifiedWebpackPlugin()
  ];
}

function isProduction(env) {
  return env.profile === 'production';
}

