const roots    = require('../gulpfile').roots;
const task     = require('../gulpfile').tasks['images'];
const imagemin = require('gulp-imagemin');
const gulp     = require('gulp');
const path     = require('path');

gulp.task('images:build', () => {
  return gulp.src(path.join(roots.src, task.roots.src, task.glob))
    .pipe(imagemin({
      progressive: true,
      interlaced: true,
      svgoPlugins: [
        {
          cleanupIDs: false,
        },
      ],
    }))
    .pipe(gulp.dest(path.join(roots.dest, task.roots.dest)));
});
