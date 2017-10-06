const roots = require('../gulpfile').roots;
const tasks = require('../gulpfile').tasks;
const gulp  = require('gulp');
const path  = require('path');

gulp.task('watch', () => {
  Object.keys(tasks).forEach(task => {
    // Webpack will watch the files
    // when hot reloading is anabled
    // if(task == 'scripts') return;
    const watch = path.join(roots.src, tasks[task].roots.src, tasks[task].glob);
    gulp.watch(watch, [task]);
  });
});
