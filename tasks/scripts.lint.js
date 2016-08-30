import config from'../gulp.config';
import gulp   from 'gulp';
import cached from 'gulp-cached';
import eslint from 'gulp-eslint';
import path   from 'path';

var scripts = config.tasks.scripts;

gulp.task('scripts:lint', () => {
  return gulp.src([
      path.join(config.root.src, scripts.src, scripts.glob),
      '!bower_components/**',
      '!node_modules/**'
    ])
    .pipe(cached('eslint'))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.result((result) => {
      if (result.errorCount || result.warningCount) {
        delete cached.caches['eslint'][path.resolve(__dirname, '../', result.filePath)];
      }
    }));
});
