import config   from '../gulp.config';
import gulp     from 'gulp';
import path     from 'path';

var images = config.tasks.images;
var deps = images.deps || [];

gulp.task('images', deps, () => {
  return gulp.src(path.join(config.root.src, images.src, images.glob))
    .pipe(gulp.dest(path.join(config.root.dest, images.dest)));
});
