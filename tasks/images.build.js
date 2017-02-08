var config = require('../gulp.config');
var imagemin = require('gulp-imagemin');
var gulp = require('gulp');
var path = require('path');

var task = config.tasks.images;
var deps = task.deps || [];

gulp.task('images:build', () => {
  return gulp.src(path.join(config.roots.src, task.roots.src, task.glob))
    .pipe(imagemin(task.plugins.imagemin))
    .pipe(gulp.dest(path.join(config.roots.dest, task.roots.dest)));
});
