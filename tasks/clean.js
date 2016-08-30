import config from '../gulp.config';
import gulp   from 'gulp';
import path   from 'path';
import del    from 'del';

var tasks = config.tasks;
var dest = config.root.dest;

gulp.task('clean', del.bind(null, [
  path.join(dest, tasks.scripts.dest),
  path.join(dest, tasks.styles.dest),
  path.join(dest, tasks.images.dest),
  path.join(dest, tasks.fonts.dest)
]));
