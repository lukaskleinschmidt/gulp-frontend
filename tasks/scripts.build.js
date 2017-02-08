var config = require('../gulp.config');
var gulp = require('gulp');
var exec = require('child_process').exec;

var task = config.tasks.scripts;
var deps = task.deps || [];

gulp.task('scripts:build', deps, () => {
  exec('webpack --color --config webpack.config.js -p', (error, stdout, stderr) => {
    if(error) {
      throw error;
    }
    console.log(stdout);
  });
});
