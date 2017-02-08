var gulp = require('gulp');

gulp.task('build', ['clean'], () => {
  gulp.start('scripts:build');
  gulp.start('styles:build');
  gulp.start('images:build');
  gulp.start('fonts');
});
