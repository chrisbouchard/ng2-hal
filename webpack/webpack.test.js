const { ContextReplacementPlugin, DefinePlugin } = require('webpack');

module.exports = resolve => ({
  output: {
    filename: '[name].js',
  },

  stats: 'errors-only',

  plugins: [
    new ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      resolve('src'),
      {} // a map of your routes
    ),
    new DefinePlugin({
      __PRODUCTION__: false
    })
  ],

  devServer: {
    contentBase: resolve('dist'),
    historyApiFallback: true,
    publicPath: '',
    stats: 'errors-only'
  }
});

