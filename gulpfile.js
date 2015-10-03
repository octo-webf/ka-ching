var gulp = require("gulp");
var eslint = require("gulp-eslint");
var jasmine = require('gulp-jasmine');
var karma = require('gulp-karma');


gulp.task("watch", function () {
  gulp.watch(["app/scripts/**/*.js"], ["eslint"]);
});

gulp.task("eslint", function () {
  return gulp.src(["app/scripts/**/*.js"])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('test', function() {
  // Be sure to return the stream
  // NOTE: Using the fake './foobar' so as to run the files
  // listed in karma.conf.js INSTEAD of what was passed to
  // gulp.src !
  return gulp.src('./foobar')
      .pipe(karma({
        configFile: 'karma.conf.js',
        action: 'run'
      }))
      .on('error', function(err) {
        // Make sure failed tests cause gulp to exit non-zero
        console.log(err);
        this.emit('end'); //instead of erroring the stream, end it
      });
});

gulp.task("default", ["eslint", "watch"]);
