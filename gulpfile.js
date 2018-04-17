const autoprefixer = require('gulp-autoprefixer')
const sourcemaps   = require('gulp-sourcemaps')
const exec         = require('child_process').exec;
const browserSync  = require('browser-sync')
const cssnano      = require('gulp-cssnano')
const sass         = require('gulp-sass')
const gzip         = require('gulp-gzip')
const gulp         = require('gulp')
const path         = require('path')
const del          = require('del');


const postcss      = require('gulp-postcss')
const postCSSCustomProperties      = require('postcss-custom-properties')

const proxy = false;
const port = 3000;
const hot = false;

const paths = exports.paths = {
  src:    'assets',
  dest:   'public/assets',
  public: 'public'
}

const tasks = exports.tasks = {
  scripts: {
    glob: '/**/*.js',
    paths: {
      src:  'scripts',
      dest: 'scripts'
    }
  },

  styles: {
    glob: '/**/*.scss',
    paths: {
      src:  'styles',
      dest: 'styles'
    }
  },

  images: {
    glob: '/**/*',
    paths: {
      src:  'images',
      dest: 'images'
    }
  },

  fonts: {
    glob: '/**/*.{eot,svg,ttf,woff,woff2}',
    paths: {
      src:  'fonts',
      dest: 'fonts'
    }
  }
}

function clean() {
  const globs = []

  Object.keys(tasks).forEach(task => {
    globs.push(path.join(paths.dest, tasks[task].paths.dest));
  })

  return del(globs)
}

function scripts() {
  return exec('webpack --color --config webpack.config.js', (error, stdout, stderr) => {
    if(error) console.log(error);
    console.log(stdout);
  })
}

function scriptsBuild() {
  const task = tasks.scripts
  const base = path.join(paths.dest, task.paths.dest)
  const src  = path.join(base, task.glob)

  return exec('webpack --color --config webpack.config.js -p', (error, stdout, stderr) => {
    if(error) console.log(error)
    console.log(stdout)

    return gulp.src(src, { base: base })
      .pipe(
        gzip({ append: true })
      )
      .pipe(gulp.dest(base))
  })
}

function styles() {
  const task = tasks.styles
  const base = path.join(paths.src, task.paths.src)
  const src  = path.join(base, task.glob)
  const dest = path.join(paths.dest, task.paths.dest)

  return gulp.src(src, { base: base })
    .pipe(sourcemaps.init())
    .pipe(
      sass
        .sync({ outputStyle: 'expanded' })
        .on('error', sass.logError)
    )
    // .pipe(
    //   postcss([
    //     postCSSCustomProperties()
    //   ])
    // )
    .pipe(
      autoprefixer({ browsers: ['last 2 versions'] })
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dest))
}

function stylesBuild() {
  const task = tasks.styles
  const dest = path.join(paths.dest, task.paths.dest)

  return styles()
    .pipe(cssnano())
    .pipe(gulp.dest(dest))
    .pipe(
      gzip({ append: true })
    )
    .pipe(gulp.dest(dest))
}

function browsersync(done) {
  const middleware = [];

  if (hot) {
    const webpack = require('webpack')
    const webpackDevMiddleware = require('webpack-dev-middleware')
    const webpackHotMiddleware = require('webpack-hot-middleware')

    const webpackConfig = require('./webpack.config.hot')
    const bundler = webpack(webpackConfig)

    // for other settings see
    // http://webpack.github.io/docs/webpack-dev-middleware.html
    middleware.push(webpackDevMiddleware(bundler, {
      publicPath: webpackConfig.output.publicPath,
      stats: { colors: true }
    }))

    // bundler should be the same as above
    middleware.push(webpackHotMiddleware(bundler))
  }

  // Files browsersync should watch
  // to trigger a page realod
  const files = [
    path.join(paths.public, '/**/*.php'),
    path.join(paths.public, '/**/*.html')
  ]

  Object.keys(tasks).forEach(task => {
    // Webpack will watch the js files
    // when hot reloading is anabled
    if (hot && task == 'scripts') return

    files.push(path.join(paths.dest, tasks[task].paths.dest, '/**/*'))
  })

  const config = proxy ? {
    middleware: middleware,
    notify: false,
    files: files,
    proxy: proxy,
    port: port
  } : {
    notify: false,
    files: files,
    port: port,
    server: {
      middleware: middleware,
      baseDir: paths.public,
      routes: {
        '/node_modules': 'node_modules'
      }
    }
  }

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
  });
}

function copy(key) {
  const task = tasks[key]
  const base = path.join(paths.src, task.paths.src)
  const src  = path.join(base, task.glob)
  const dest = path.join(paths.dest, task.paths.dest)

  return gulp.src(src, { base: base })
    .pipe(gulp.dest(dest))
}

function images() {
  return copy('images')
}

function fonts() {
  return copy('fonts')
}

gulp.task('clean', clean)
gulp.task('scripts', scripts)
gulp.task('scripts.build', scriptsBuild)
gulp.task('styles', styles)
gulp.task('styles.build', stylesBuild)
gulp.task('browsersync', browsersync)
gulp.task('images', images)
gulp.task('fonts', fonts)
gulp.task('watch', watch)

const serve = gulp.parallel(
  'browsersync',
  'watch'
)

const build = gulp.series('clean', gulp.parallel(
  'scripts.build',
  'styles.build',
  'images',
  'fonts'
))

gulp.task('default', build)
gulp.task('build', build)
gulp.task('serve', serve)
