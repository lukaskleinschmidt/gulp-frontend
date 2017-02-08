var config = require('../gulp.config');
var exec = require('child_process').exec;
var gzip = require('gulp-gzip');
var gulp = require('gulp');
var path = require('path');

var task = config.tasks.scripts;
var deps = task.deps || [];

gulp.task('scripts:build', deps, () => {
  exec('webpack --color --config webpack.config.js -p', (error, stdout, stderr) => {
    if(error) {
      throw error;
    }
    console.log(stdout);

    gulp.src(path.join(config.roots.dest, task.roots.dest, '/*.js'))
      .pipe(gzip({ append: true }))
      .pipe(gulp.dest(path.join(config.roots.dest, task.roots.dest)));
  });
});
