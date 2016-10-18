import config  from '../gulp.config';
import gulp    from 'gulp';
import uglify  from 'gulp-uglify';
import gzip    from 'gulp-gzip';
import path    from 'path';

var dest = path.join(config.root.dest, config.tasks.scripts.dest);

gulp.task('scripts:build', ['scripts'], () => {
  return gulp.src(path.join(config.root.dest, config.tasks.scripts.dest, '/*.js'))
    .pipe(uglify())
    .pipe(gulp.dest(dest))
    .pipe(gzip({
      append: true
    }))
    .pipe(gulp.dest(dest));
});
