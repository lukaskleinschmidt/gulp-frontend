var config = require('../gulp.config');
var browserSync = require('browser-sync');
var gulp = require('gulp');
var path = require('path');

var task = config.tasks.serve;
var deps = task.deps || [];

gulp.task('serve', deps.concat('watch'), () => {

  var middleware = [];

  if(task.plugins.browserSync.hot) {
    var webpack = require('webpack');
    var webpackDevMiddleware = require('webpack-dev-middleware');
    var webpackHotMiddleware = require('webpack-hot-middleware');

    var webpackConfig = require('../webpack.config.hot');
    var bundler = webpack(webpackConfig);

    // for other settings see
    // http://webpack.github.io/docs/webpack-dev-middleware.html
    middleware.push(webpackDevMiddleware(bundler, {
      publicPath: webpackConfig.output.publicPath,
      stats: { colors: true },
    }));

    // bundler should be the same as above
    middleware.push(webpackHotMiddleware(bundler));
  }

  var notify = task.plugins.browserSync.notify;
  var proxy = task.plugins.browserSync.proxy;
  var port = task.plugins.browserSync.port;

  var files = [];
  var globs = {
    'scripts': '/**/*.js',
    'styles': '/**/*.css',
    'fonts': '/**/*.{eot,svg,ttf,woff,woff2}',
  };

  config.tasks.watch.tasks.forEach(task => {
    var glob = task in globs ? globs[task] : '/**/*';
    files.push(path.join(config.roots.dest, config.tasks[task].roots.dest, glob));
  });

  task.plugins.browserSync.files.forEach(file => {
    files.push(path.join(config.roots.public, file));
  });

  var browserSyncConfig = proxy ? {
    middleware: middleware,
    notify: notify,
    files: files,
    proxy: proxy,
    port: port,
  } : {
    notify: notify,
    files: files,
    port: port,
    server: {
      middleware: middleware,
      baseDir: config.roots.public,
      routes: {
        '/node_modules': 'node_modules'
      },
    },
  };

  browserSync(browserSyncConfig);
});
