import config  from '../gulp.config';
import gulp    from 'gulp';
import cssnano from 'gulp-cssnano';
import gzip    from 'gulp-gzip';
import path    from 'path';

var dest = path.join(config.root.dest, config.tasks.styles.dest);

gulp.task('styles:build', ['styles'], () => {
  return gulp.src(path.join(config.root.dest, config.tasks.styles.dest, '/*.css'))
    .pipe(cssnano({
      reduceIdents: {
        keyframes: false
      },
      discardUnused: {
        keyframes: false
      }
    }))
    .pipe(gulp.dest(dest))
    .pipe(gzip({
      append: true
    }))
    .pipe(gulp.dest(dest));
});
