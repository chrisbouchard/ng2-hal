var gulp = require('gulp');
var gulpClean = require('gulp-clean');
var gulpUtil = require('gulp-util');

var karma = require('karma');

var runSequence = require('run-sequence');

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var webpackConfig = require('./webpack.config');

gulp.task('default', ['build']);

gulp.task('build', function (callback) {
    runSequence('clean', 'webpack:build', callback);
});

gulp.task('server', ['webpack-dev-server']);

var statsConfig = {
  colors: true,
  hash: false,
  version: false,
  chunks: false,
  children: false
};

gulp.task('webpack:build', function (callback) {
  var buildConfig = Object.create(webpackConfig);

  webpack(buildConfig, function (err, stats) {
    if (err) {
      throw new gulpUtil.PluginError('webpack', err);
    }

    gulpUtil.log('[webpack]', stats.toString(statsConfig));
    callback();
  });
});

gulp.task('webpack-dev-server', function (callback) {
  var serverConfig = Object.create(webpackConfig);
  var compiler = webpack(serverConfig);

  var server = new WebpackDevServer(compiler, {
    contentBase: 'dist',
    historyApiFallback: true,
    publicPath: serverConfig.output.publicPath,
    stats: statsConfig
  });

  server.listen(8080, 'localhost', function (err) {
    if (err) {
      throw new gulpUtil.PluginError('webpack-dev-server', err);
    }

    gulpUtil.log('[webpack-dev-server]', 'http://localhost:8080/');
  });
});

gulp.task('clean', function () {
    return gulp.src('./dist', {read: false}).pipe(gulpClean());
});

gulp.task('test', function (done) {
  new karma.Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('test-ci', function (done) {
  new karma.Server({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();
});

