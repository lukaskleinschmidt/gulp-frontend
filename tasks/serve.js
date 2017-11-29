const roots       = require('../gulpfile').roots;
const tasks       = require('../gulpfile').tasks;
const browserSync = require('browser-sync');
const gulp        = require('gulp');
const path        = require('path');

const proxy = false;
const port  = 3000;

gulp.task('serve', ['scripts', 'styles', 'images', 'fonts', 'watch'], () => {

  const middleware = [];

  // Enable hot reloading
  // const webpack = require('webpack');
  // const webpackDevMiddleware = require('webpack-dev-middleware');
  // const webpackHotMiddleware = require('webpack-hot-middleware');
  //
  // const webpackConfig = require('../webpack.config.hot');
  // const bundler = webpack(webpackConfig);
  //
  // // for other settings see
  // // http://webpack.github.io/docs/webpack-dev-middleware.html
  // middleware.push(webpackDevMiddleware(bundler, {
  //   publicPath: webpackConfig.output.publicPath,
  //   stats: { colors: true },
  // }));
  //
  // // bundler should be the same as above
  // middleware.push(webpackHotMiddleware(bundler));

  // Files browsersync should watch
  // to trigger a page realod
  const files = [
    path.join(roots.public, '/**/*.php'),
    path.join(roots.public, '/**/*.html'),
  ];

  const globs = {
    scripts: '/**/*.js',
    styles: '/**/*.css',
    fonts: '/**/*.{eot,svg,ttf,woff,woff2}',
  };

  Object.keys(tasks).forEach(task => {
    // Webpack will watch the files
    // when hot reloading is anabled
    // if(task == 'scripts') return;
    const glob = task in globs ? globs[task] : '/**/*';
    files.push(path.join(roots.dest, tasks[task].roots.dest, glob));
  });

  const browserSyncConfig = proxy ? {
    middleware: middleware,
    notify: false,
    files: files,
    proxy: proxy,
    port: port,
  } : {
    notify: false,
    files: files,
    port: port,
    server: {
      middleware: middleware,
      baseDir: roots.public,
      routes: {
        '/node_modules': 'node_modules'
      },
    },
  };

  browserSync(browserSyncConfig);
});
