const roots   = require('../gulpfile').roots;
const task    = require('../gulpfile').tasks['styles'];
const cssnano = require('gulp-cssnano');
const gzip    = require('gulp-gzip');
const gulp    = require('gulp');
const path    = require('path');

const dest = path.join(roots.dest, task.roots.dest);

gulp.task('styles:build', ['styles'], () => {
  return gulp.src(path.join(roots.dest, task.roots.dest, '/**/*.css'))
    .pipe(cssnano())
    .pipe(gulp.dest(dest))
    .pipe(gzip({
      append: true
    }))
    .pipe(gulp.dest(dest));
});
