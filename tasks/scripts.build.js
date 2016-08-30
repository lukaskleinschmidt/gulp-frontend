import config  from '../gulp.config';
import gulp    from 'gulp';
import uglify  from 'gulp-uglify';
import path    from 'path';

gulp.task('scripts:build', ['scripts'], () => {
  return gulp.src(path.join(config.root.dest, config.tasks.scripts.dest, '/*.js'))
    .pipe(uglify())
    .pipe(gulp.dest(path.join(config.root.dest, config.tasks.scripts.dest)));
});
