var gulp = require('gulp');
var gulpClean = require('gulp-clean');
var gulpUtil = require('gulp-util');

var karma = require('karma');

var runSequence = require('run-sequence');

gulp.task('default', ['build']);

gulp.task('build', function (callback) {
    runSequence('clean', 'build:cjs', callback);
});

gulp.task('build:cjs', function (callback) {
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

