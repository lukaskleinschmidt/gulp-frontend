import config      from '../gulp.config';
import gulp        from 'gulp';
import browserSync from 'browser-sync';
import path        from 'path';

var tasks = config.tasks;
var watch = tasks.watch;
var glob = watch.glob.map((value) => {return path.join(config.root.dest, value)});
var deps = watch.deps || [];

gulp.task('watch', deps, () => {
  if (watch.glob) gulp.watch(glob).on('change', browserSync.reload);
  watch.tasks.forEach((task) => {
    gulp.watch(path.join(config.root.src, tasks[task].src, tasks[task].glob), [task]);
  });
});
