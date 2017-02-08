var config = require('../gulp.config');
var gulp = require('gulp');
var path = require('path');

var task = config.tasks.watch;
var deps = task.deps || [];

gulp.task('watch', deps, () => {
  if(task.tasks) {
    task.tasks.forEach(task => {
      var watch = path.join(config.roots.src, config.tasks[task].roots.src, config.tasks[task].glob);
      gulp.watch(watch, [task]);
    });
  }
});
