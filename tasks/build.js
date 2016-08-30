import gulp from 'gulp';

gulp.task('build', ['clean'], () => {
  gulp.start('scripts:build');
  gulp.start('styles:build');
  gulp.start('images:build');
  gulp.start('fonts');
});
