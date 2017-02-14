const { DefinePlugin } = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = resolve => ({
  target: 'node',
  externals: [nodeExternals()],

  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },

  plugins: [
    new DefinePlugin({
      __PRODUCTION__: false
    })
  ]
});

