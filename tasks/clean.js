const roots = require('../gulpfile').roots;
const tasks = require('../gulpfile').tasks;
const gulp  = require('gulp');
const path  = require('path');
const del   = require('del');

const paths = [];

Object.keys(tasks).forEach(task => {
  paths.push(path.join(roots.dest, tasks[task].roots.dest));
});

gulp.task('clean', del.bind(null, paths));
