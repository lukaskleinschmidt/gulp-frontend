const path = require('path');
const del = require('del');
const exec = require('child_process').exec;
const browserSync = require('browser-sync');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('gulp-cssnano');
const sprite = require('gulp-svg-sprite');
const sass = require('gulp-sass');
const gzip = require('gulp-gzip');
const gulp = require('gulp');

const NODE_ENV = process.env.NODE_ENV;
const FLAG_HOT = process.env.npm_config_hot || false;

function clean() {
  return del([
    'public/assets/scripts',
    'public/assets/styles',
    'public/assets/media',
    'public/assets/fonts',
  ]);
}

function scripts() {
  return exec('node node_modules/webpack/bin/webpack.js --hide-modules --color --config webpack.config.js', (error, stdout) => {
    if (error) console.log(error);
    console.log(stdout);
  });
}

function scriptsBuild() {
  return exec('node node_modules/webpack/bin/webpack.js --color --config webpack.config.js -p', (error, stdout) => {
    if (error) console.log(error);
    console.log(stdout);

    return gulp.src('public/assets/scripts/**/*.js')
      .pipe(gzip({ append: true }))
      .pipe(gulp.dest('public/assets/scripts'));
  });
}

function styles() {
  return gulp.src('assets/styles/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(
      sass.sync({ outputStyle: 'expanded' })
        .on('error', sass.logError)
    )
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/assets/styles'));
}

function stylesBuild() {
  return styles()
    .pipe(cssnano({
      reduceIdents: false,
      discardUnused: {
        fontFace: false,
        counterStyle: false,
        keyframes: false,
        namespace: false,
      }
    }))
    .pipe(gulp.dest('public/assets/styles'))
    .pipe(gzip({ append: true }))
    .pipe(gulp.dest('public/assets/styles'));
}

function browsersync(done) {
  const middleware = [];

  if (FLAG_HOT) {
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');

    const webpackConfig = require('./webpack.config.hot');
    const bundler = webpack(webpackConfig);

    // For other settings see
    // http://webpack.github.io/docs/webpack-dev-middleware.html
    middleware.push(webpackDevMiddleware(bundler, {
      publicPath: webpackConfig.output.publicPath,
      stats: { colors: true, modules: false },
    }));

    // Bundler should be the same as above
    middleware.push(webpackHotMiddleware(bundler));
  }

  browserSync({
    // middleware: middleware,
    // proxy: null,
    server: {
      middleware: middleware,
      baseDir: 'public',
      routes: {
        '/node_modules': 'node_modules',
      }
    },
    reloadOnRestart: true,
    notify: false,
    files: [
      'public/assets/**/*',
    ],
    ignore: [
      //
    ],
    ghostMode: {
      clicks: false,
      scroll: false,
      location: false,
      forms: false,
    }
  });

  done();
}

function watch() {
  gulp.watch('assets/styles/**/*.scss', { ignoreInitial: false }, styles);
  gulp.watch('assets/icons/**/*.svg', { ignoreInitial: false }, icons);
  gulp.watch('assets/media/**/*', { ignoreInitial: false }, media);
  gulp.watch('assets/fonts/**/*.{eot,svg,ttf,woff,woff2,otf}', { ignoreInitial: false }, fonts);

  if (FLAG_HOT === false) {
    gulp.watch('assets/scripts/**/*.js', { ignoreInitial: false }, scripts);
  }
}

function icons() {
  const svgoConfig = {
    plugins: [
      { removeHiddenElems: true },
      { convertShapeToPath: true },
      {
        removeUnknownsAndDefaults: {
          keepAriaAttrs: false,
        }
      }
    ]
  }

  return gulp.src('assets/icons/**/*.svg')
    .pipe(sprite({
      shape: {
        id: {
          whitespace: '_',
          separator: '.',
          generator: 'icons.%s',
        },
        transform : [
          { svgo: svgoConfig },
        ],
      },
      svg: {
        // namespaceIDs: false,
        // namespaceClassnames: false,
        // transform: [
        //   (svg) => {
        //     return svg.replace(/\<svg/g, '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"')
        //   },
        // ]
      },
      mode: {
        symbol: {
          inline: true,
          sprite: 'icons.svg',
          dest: '.',
        },
      }
    }))
    .pipe(gulp.dest('public/assets/media'));
}

function media() {
  return gulp.src('assets/media/**/*')
    .pipe(gulp.dest('public/assets/media'));
}

function fonts() {
  return gulp.src('assets/fonts/**/*.{eot,svg,ttf,woff,woff2,otf}')
    .pipe(gulp.dest('public/assets/fonts'));
}

gulp.task('clean', clean);
gulp.task('scripts', scripts);
gulp.task('scripts:build', scriptsBuild);
gulp.task('styles', styles);
gulp.task('styles:build', stylesBuild);
gulp.task('browsersync', browsersync);
gulp.task('media', media);
gulp.task('icons', icons);
gulp.task('fonts', fonts);
gulp.task('watch', watch);

const serve = gulp.parallel(
  'watch',
  'browsersync',
);

const build = gulp.series('clean', gulp.parallel(
  'scripts:build',
  'styles:build',
  'media',
  'icons',
  'fonts',
));

gulp.task('default', build);
gulp.task('build', build);
gulp.task('serve', serve);
