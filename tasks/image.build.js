import config   from '../gulp.config';
import gulp     from 'gulp';
import cached   from 'gulp-cached';
import imagemin from 'gulp-imagemin';
import path     from 'path';

var images = config.tasks.images;

gulp.task('images:build', () => {
  return gulp.src(path.join(config.root.src, images.src, images.glob))
    .pipe(cached(imagemin(config.tasks.images.imagemin)))
    .pipe(gulp.dest(path.join(config.root.dest, images.dest)));
});
