const autoprefixer = require('gulp-autoprefixer')
const sourcemaps = require('gulp-sourcemaps')
const exec = require('child_process').exec
const browserSync = require('browser-sync')
const sprite = require('gulp-svg-sprite')
const cssnano = require('gulp-cssnano')
const sass = require('gulp-sass')
const gzip = require('gulp-gzip')
const gulp = require('gulp')
const path = require('path')
const del = require('del')

const proxy = process.env.npm_config_proxy || false
const port = process.env.npm_config_port || 3000
const hot = process.env.npm_config_hot || false

const paths = exports.paths = {
  src: 'assets',
  dest: 'public/assets',
  public: 'public',
}

const tasks = exports.tasks = {
  scripts: {
    glob: '/**/*.js',
    paths: {
      src: 'scripts',
      dest: 'scripts',
    }
  },

  styles: {
    glob: '/**/*.scss',
    paths: {
      src: 'styles',
      dest: 'styles',
    }
  },

  media: {
    glob: '/**/*',
    paths: {
      src: 'media',
      dest: 'media',
    }
  },

  icons: {
    glob: '/**/*.svg',
    paths: {
      src: 'icons',
      dest: 'icons',
    }
  },

  fonts: {
    glob: '/**/*.{eot,svg,ttf,woff,woff2,otf}',
    paths: {
      src: 'fonts',
      dest: 'fonts',
    }
  }
}

function join() {
  return path.join(...arguments)
    .split(path.sep)
    .join('/')
}

function clean() {
  const globs = []

  Object.keys(tasks).forEach(task => {
    globs.push(path.join(paths.dest, tasks[task].paths.dest))
  })

  return del(globs)
}

function scripts() {
  return exec('node node_modules/webpack/bin/webpack.js --hide-modules --color --config webpack.config.js', (error, stdout) => {
    if (error) console.log(error)
    console.log(stdout)
  })
}

function scriptsBuild() {
  const task = tasks.scripts
  const dest = join(paths.dest, task.paths.dest)
  const src = join(paths.dest, task.paths.dest, task.glob)

  return exec('node node_modules/webpack/bin/webpack.js --color --config webpack.config.js -p', (error, stdout) => {
    if (error) console.log(error)
    console.log(stdout)

    return gulp.src(src)
      .pipe(gzip({ append: true }))
      .pipe(gulp.dest(dest))
  })
}

function styles() {
  const task = tasks.styles
  const dest = join(paths.dest, task.paths.dest)
  const src = join(paths.src, task.paths.src, task.glob)

  return gulp.src(src)
    .pipe(sourcemaps.init())
    .pipe(
      sass.sync({ outputStyle: 'expanded' })
        .on('error', sass.logError)
    )
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dest))
}

function stylesBuild() {
  const task = tasks.styles
  const dest = join(paths.dest, task.paths.dest)

  return styles()
    .pipe(cssnano())
    .pipe(gulp.dest(dest))
    .pipe(gzip({ append: true }))
    .pipe(gulp.dest(dest))
}

function browsersync(done) {
  const middleware = []

  if (hot) {
    const webpack = require('webpack')
    const webpackDevMiddleware = require('webpack-dev-middleware')
    const webpackHotMiddleware = require('webpack-hot-middleware')

    const webpackConfig = require('./webpack.config.hot')
    const bundler = webpack(webpackConfig)

    // For other settings see
    // http://webpack.github.io/docs/webpack-dev-middleware.html
    middleware.push(webpackDevMiddleware(bundler, {
      publicPath: webpackConfig.output.publicPath,
      stats: {
        colors: true,
        modules: false,
      }
    }))

    // Bundler should be the same as above
    middleware.push(webpackHotMiddleware(bundler))
  }

  // Files browsersync should watch
  // to trigger a page realod
  const files = [
    path.join(paths.public, '/**/*.html')
  ]

  Object.keys(tasks).forEach(task => {
    // Webpack will watch the js files
    // when hot reloading is anabled
    if (hot && task == 'scripts') return

    files.push(path.join(paths.dest, tasks[task].paths.dest, '/**/*'))
  })

  const config = Object.assign({
    reloadOnRestart: true,
    notify: false,
    files: files,
    port: port,
    ignore: [
      //
    ],
    ghostMode: {
      clicks: false,
      scroll: false,
      location: false,
      forms: false,
    }
  }, proxy ? {
    middleware: middleware,
    proxy: proxy,
  } : {
    server: {
      middleware: middleware,
      baseDir: paths.public,
      routes: {
        '/node_modules': 'node_modules',
      }
    }
  })

  browserSync(config)
  done()
}

function watch() {
  Object.keys(tasks).forEach(key => {
    // Webpack will watch the js files
    // when hot reloading is anabled
    if (hot && key == 'scripts') return

    const task = tasks[key]
    const glob = path.join(paths.src, task.paths.src, task.glob)
    const call = gulp.series(key)

    gulp.watch(glob.split(path.sep).join('/'), { ignoreInitial: false }, call)
  })
}

function icons() {
  const task = tasks.icons
  const dest = join(paths.dest, task.paths.dest)
  const src = join(paths.src, task.paths.src, task.glob)

  const config = {
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

  return gulp.src(src)
    .pipe(sprite({
      shape: {
        id: {
          whitespace: '_',
          separator: '.',
          generator: 'icons.%s',
        },
        transform : [
          { svgo: config },
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
          sprite: 'sprite.svg',
          dest: '.',
        },
      }
    }))
    .pipe(gulp.dest(dest))
}

function copy(key) {
  const task = tasks[key]
  const dest = join(paths.dest, task.paths.dest)
  const src = join(paths.src, task.paths.src, task.glob)

  return gulp.src(src)
    .pipe(gulp.dest(dest))
}

function media() {
  return copy('media')
}

function fonts() {
  return copy('fonts')
}

gulp.task('clean', clean)
gulp.task('scripts', scripts)
gulp.task('scripts:build', scriptsBuild)
gulp.task('styles', styles)
gulp.task('styles:build', stylesBuild)
gulp.task('browsersync', browsersync)
gulp.task('media', media)
gulp.task('icons', icons)
gulp.task('fonts', fonts)
gulp.task('watch', watch)

const serve = gulp.parallel(
  'browsersync',
  'watch',
)

const build = gulp.series('clean', gulp.parallel(
  'scripts:build',
  'styles:build',
  'media',
  'icons',
  'fonts',
))

gulp.task('default', build)
gulp.task('build', build)
gulp.task('serve', serve)
