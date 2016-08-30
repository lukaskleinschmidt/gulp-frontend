import config  from '../gulp.config';
import gulp    from 'gulp';
import cssnano from 'gulp-cssnano';
import path    from 'path';

gulp.task('styles:build', ['styles'], () => {
  return gulp.src(path.join(config.root.dest, config.tasks.styles.dest, '/*.css'))
    .pipe(cssnano())
    .pipe(gulp.dest(path.join(config.root.dest, config.tasks.styles.dest)));
});
