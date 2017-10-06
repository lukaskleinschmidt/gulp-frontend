const roots = require('../gulpfile').roots;
const task  = require('../gulpfile').tasks['images'];
const gulp  = require('gulp');
const path  = require('path');

gulp.task('images', () => {
  return gulp.src(path.join(roots.src, task.roots.src, task.glob))
    .pipe(gulp.dest(path.join(roots.dest, task.roots.dest)));
});
