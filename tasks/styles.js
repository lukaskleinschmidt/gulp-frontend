import config       from '../gulp.config';
import gulp         from 'gulp';
import sass         from 'gulp-sass';
import notify       from 'gulp-notify';
import plumber      from 'gulp-plumber';
import sourcemaps   from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import browserSync  from 'browser-sync';
import path         from 'path';

var styles = config.tasks.styles;
var deps = styles.deps || [];

gulp.task('styles', deps, () => {
  return gulp.src(path.join(config.root.src, styles.src, styles.glob))
    .pipe(plumber({errorHandler: notify.onError({
      title: 'Gulp styles',
      message: function(error) {
        var pathRelative = path.relative(path.join(config.root.src, styles.src), error.relativePath);
        var line = error.line;
        return pathRelative + ' on line ' + line;
      },
    })}))
    .pipe(sourcemaps.init())
    .pipe(sass.sync(styles.sass).on('error', sass.logError))
    .pipe(autoprefixer(styles.autoprefixer))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.join(config.root.dest, styles.dest)))
    .pipe(browserSync.stream());
});
