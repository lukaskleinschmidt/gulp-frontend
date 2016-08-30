import config      from '../gulp.config';
import gulp        from 'gulp';
import browserSync from 'browser-sync';
import path        from 'path';

var serve = config.tasks.serve;
var deps = serve.deps.concat(['watch']);
var browserSyncConfig = serve.browserSync.proxy ? {
  notify: serve.browserSync.notify,
  port: serve.browserSync.port || 9000,
  proxy: serve.browserSync.proxy
} : {
  notify: serve.browserSync.notify,
  port: serve.browserSync.port || 9000,
  server: serve.browserSync.server || {
    baseDir: [config.root.dest],
    routes: {
      '/bower_components': 'bower_components',
      '/node_modules': 'node_modules'
    }
  }
}

gulp.task('serve', deps, () => {
  browserSync.init(browserSyncConfig);
});
