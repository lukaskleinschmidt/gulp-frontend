const roots = require('../gulpfile').roots;
const task  = require('../gulpfile').tasks['fonts'];
const gulp  = require('gulp');
const path  = require('path');

gulp.task('fonts', () => {
  return gulp.src(path.join(roots.src, task.roots.src, task.glob))
    .pipe(gulp.dest(path.join(roots.dest, task.roots.dest)));
});

exports.task = task;
