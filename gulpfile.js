var gulp = require('gulp');
var gulpUtil = require('gulp-util');

var semantic = {
  build: require('./semantic/tasks/build'),
  watch: require('./semantic/tasks/watch')
};

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var webpackConfig = require('./webpack.config');

gulp.task('default', ['build']);

gulp.task('build', ['webpack:build']);
gulp.task('server', ['semantic:watch', 'webpack-dev-server']);

gulp.task('semantic:build', semantic.build);
gulp.task('semantic:watch', semantic.watch);

gulp.task('webpack:build', function (callback) {
  var buildConfig = Object.create(webpackConfig);

  buildConfig.plugins = buildConfig.plugins.concat([
    new webpack.optimize.DedupePlugin(),
    // TODO: Figure out how to enable this without breaking things.
    // new webpack.optimize.UglifyJsPlugin()
  ]);

  webpack(buildConfig, function (err, stats) {
    if (err) throw new gulpUtil.PluginError('webpack', err);
    gulpUtil.log('[webpack]', stats.toString({
      colors: true
    }));
    callback();
  });
});

gulp.task('webpack-dev-server', function (callback) {
  var serverConfig = Object.create(webpackConfig);
  serverConfig.devtool = 'eval';
  serverConfig.debug = 'true';

  var compiler = webpack(serverConfig);

  var server = new WebpackDevServer(compiler, {
    stats: { colors: true },
    contentBase: 'content',
    publicPath: serverConfig.output.publicPath
  }).listen(8080, 'localhost', function (err) {
    if (err) throw new gulpUtil.PluginError('webpack-dev-server', err);
    gulpUtil.log('[webpack-dev-server]', 'http://localhost:8080/');
  });
});

