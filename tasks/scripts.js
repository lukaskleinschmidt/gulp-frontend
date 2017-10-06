const task = require('../gulpfile').tasks['scripts'];
const gulp = require('gulp');
const exec = require('child_process').exec;

gulp.task('scripts', () => {
  exec('webpack --color --config webpack.config.js', (error, stdout, stderr) => {
    if(error) console.log(error);
    console.log(stdout);
  });
});
