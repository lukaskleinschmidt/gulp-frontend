import config      from '../gulp.config';
import gulp        from 'gulp';
import plumber     from 'gulp-plumber';
import sourcemaps  from 'gulp-sourcemaps';
import webpack     from 'webpack';
import gulpWebpack from 'webpack-stream';
import browserSync from 'browser-sync';
import notifier    from 'node-notifier';
import path        from 'path';

var scripts = config.tasks.scripts;
var deps = scripts.deps || [];
var webpackConfig = {
  context: path.resolve(config.root.src, scripts.src),
  entry: scripts.webpack.entry || [],
  plugins: [],
  output: {
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
}

if (scripts.webpack.common) {
  webpackConfig.plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: '[name].js'
    })
  );
}

gulp.task('scripts', deps, () => {
  return gulp.src(path.join(config.root.src, scripts.src, scripts.glob))
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(gulpWebpack(webpackConfig, webpack, (err, stats) => {
      if (stats.compilation.errors.length) {
        var pathRelative = path.relative(path.join(config.root.src, scripts.src), stats.compilation.errors[0].module.resource);
        var line = stats.compilation.errors[0].error.loc.line;
        notifier.notify({
          title: 'Gulp scripts',
          message: pathRelative + ' on line ' + line,
          icon: path.resolve('node_modules/gulp-notify/assets/gulp-error.png'),
        });
      }
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.join(config.root.dest, scripts.dest)))
    .pipe(browserSync.stream());
});
