var config = require('../gulp.config');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var gulp = require('gulp');
var path = require('path');

var task = config.tasks.styles;
var deps = task.deps || [];

gulp.task('styles', deps, () => {
  return gulp.src(path.join(config.roots.src, task.roots.src, task.glob))
    .pipe(sourcemaps.init())
    .pipe(sass.sync(task.plugins.sass).on('error', sass.logError))
    .pipe(autoprefixer(task.plugins.autoprefixer))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.join(config.roots.dest, task.roots.dest)))
});
