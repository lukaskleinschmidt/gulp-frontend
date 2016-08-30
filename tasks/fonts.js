import config from '../gulp.config';
import gulp   from 'gulp';
import path   from 'path';

var fonts = config.tasks.fonts;
var deps = fonts.deps || [];
var src = path.join(config.root.src, fonts.src, fonts.glob);

gulp.task('fonts', deps, () => {
  return gulp.src(src)
    .pipe(gulp.dest(path.join(config.root.dest, fonts.dest)));
});