var gulp = require("gulp");
var eslint = require("gulp-eslint");

gulp.task("watch", function () {
  gulp.watch(["app/scripts/**/*.js"], ["eslint"]);
});

gulp.task("eslint", function () {
  return gulp.src(["app/scripts/**/*.js"])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task("default", ["eslint", "watch"]);
