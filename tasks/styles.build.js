var config = require('../gulp.config');
var cssnano = require('gulp-cssnano');
var gzip = require('gulp-gzip');
var gulp = require('gulp');
var path = require('path');

var task = config.tasks.styles;
var dest = path.join(config.roots.dest, task.roots.dest);

gulp.task('styles:build', ['styles'], () => {
  return gulp.src(path.join(config.roots.dest, task.roots.dest, '/**/*.css'))
    .pipe(cssnano({
      reduceIdents: {
        keyframes: true
      },
      discardUnused: {
        keyframes: true
      }
    }))
    .pipe(gulp.dest(dest))
    .pipe(gzip({ append: true }))
    .pipe(gulp.dest(dest));
});
