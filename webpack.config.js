var path = require('path');
var webpack = require('webpack');

var { DefinePlugin } = webpack;

var { UglifyJsPlugin } = webpack.optimize;

const defaultEnv = {
  profile: "development",
};

module.exports = (env = defaultEnv) => ({
  entry: {
    'ng2-hal': ['./src']
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    sourceMapFilename: '[name].js.map'
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
    new UglifyJsPlugin()
  ];
}

function isProduction(env) {
  return env.profile === 'production';
}

