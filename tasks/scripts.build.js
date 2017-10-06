const roots = require('../gulpfile').roots;
const task  = require('../gulpfile').tasks['scripts'];
const gzip  = require('gulp-gzip');
const path  = require('path');
const gulp  = require('gulp');
const exec  = require('child_process').exec;

gulp.task('scripts:build', () => {
  exec('webpack --color --config webpack.config.js -p', (error, stdout, stderr) => {
    if(error) console.log(error);
    console.log(stdout);

    gulp.src(path.join(roots.dest, task.roots.dest, task.glob))
      .pipe(gzip({
        append: true
      }))
      .pipe(gulp.dest(path.join(roots.dest, task.roots.dest)));
  });
});
