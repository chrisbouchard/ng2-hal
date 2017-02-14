const UnminifiedWebpackPlugin = require('unminified-webpack-plugin');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const { DefinePlugin } = webpack;
const { UglifyJsPlugin } = webpack.optimize;

module.exports = resolve => ({
  target: 'node',
  externals: [nodeExternals()],

  output: {
    filename: '[name].min.js',
    libraryTarget: 'commonjs2'
  },

  plugins: [
    new DefinePlugin({
      __PRODUCTION__: true
    }),
    new UglifyJsPlugin(),
    new UnminifiedWebpackPlugin()
  ]
});

