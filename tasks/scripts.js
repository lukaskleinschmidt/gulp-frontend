var config = require('../gulp.config');
var gulp = require('gulp');
var exec = require('child_process').exec;

var task = config.tasks.scripts;
var deps = task.deps || [];

gulp.task('scripts', deps, () => {
  exec('webpack --color --config webpack.config.js', (error, stdout, stderr) => {
    if(error) {
      console.log(error);
    }
    console.log(stdout);
  });
});
