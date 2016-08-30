import config   from '../gulp.config';
import gulp     from 'gulp';
import sassLint from 'gulp-sass-lint';
import path     from 'path';

var styles = config.tasks.styles;

gulp.task('styles:lint', () => {
  return gulp.src([
    path.join(config.root.src, styles.src, styles.glob),
    '!' + path.join(config.root.src, styles.src, '{vendor,vendor/**}'),
    '!bower_components/**',
    '!node_modules/**'
  ])
  .pipe(sassLint())
  .pipe(sassLint.format())
  .pipe(sassLint.failOnError());
});
