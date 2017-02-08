var config = require('../gulp.config');
var gulp = require('gulp');
var path = require('path');
var del = require('del');

var task = config.tasks.clean;
var deps = task.deps || [];

var paths = [];

task.tasks.forEach(task => {
  task = config.tasks[task];
  paths.push(path.join(config.roots.dest, task.roots.dest));
});

gulp.task('clean', deps, del.bind(null, paths));
