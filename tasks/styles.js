const roots        = require('../gulpfile').roots;
const task         = require('../gulpfile').tasks['styles'];
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps   = require('gulp-sourcemaps');
const sass         = require('gulp-sass');
const gulp         = require('gulp');
const path         = require('path');

gulp.task('styles', () => {
  return gulp.src(path.join(roots.src, task.roots.src, task.glob))
    .pipe(sourcemaps.init())
    .pipe(sass.sync({
      outputStyle: 'expanded',
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['> 1%', 'last 2 versions', 'Firefox ESR'],
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.join(roots.dest, task.roots.dest)))
});

exports.task = task;
