var gulp = require('gulp');
var gulpUtil = require('gulp-util');

var karma = require('karma');

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

gulp.task('test', function (done) {
  new karma.Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('ci', function (done) {
  new karma.Server({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();
});

