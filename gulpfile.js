const autoprefixer = require('gulp-autoprefixer')
const sourcemaps   = require('gulp-sourcemaps')
const exec         = require('child_process').exec;
const bs           = require('browser-sync')
const cssnano      = require('gulp-cssnano')
const sass         = require('gulp-sass')
const gzip         = require('gulp-gzip')
const gulp         = require('gulp')
const path         = require('path')
const del          = require('del');

const proxy = false;
const port = 3000;
const hot = false;

const paths = {
  public: 'public',
  dest:   'public/assets',
  src:    'assets'
}

const tasks = {
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

const clean = () => {
  const globs = []

  Object.keys(tasks).forEach(task => {
    globs.push(path.join(paths.dest, tasks[task].paths.dest));
  })

  return del(globs)
}

const scripts = () => {
  return exec('webpack --color --config webpack.config.js', (error, stdout, stderr) => {
    if(error) console.log(error);
    console.log(stdout);
  })
}

const scriptsBuild = () => {
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

const styles = () => {
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
    .pipe(
      autoprefixer({ browsers: ['last 2 versions'] })
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dest))
}

const stylesBuild = () => {
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

const browsersync = done => {
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

  const globs = {
    scripts: '/**/*.js',
    styles: '/**/*.css',
    fonts: '/**/*.{eot,svg,ttf,woff,woff2}'
  }

  Object.keys(tasks).forEach(task => {
    // Webpack will watch the js files
    // when hot reloading is anabled
    if (hot && task == 'scripts') return
    const glob = task in globs ? globs[task] : '/**/*'
    files.push(path.join(paths.dest, tasks[task].paths.dest, glob))
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

  bs(config)
  done()
}

const images = () => {
  const task = tasks.images
  const base = path.join(paths.src, task.paths.src)
  const src  = path.join(base, task.glob)
  const dest = path.join(paths.dest, task.paths.dest)

  return gulp.src(src, { base: base })
    .pipe(gulp.dest(dest))
}

const fonts = () => {
  const task = tasks.fonts
  const base = path.join(paths.src, task.paths.src)
  const src  = path.join(base, task.glob)
  const dest = path.join(paths.dest, task.paths.dest)

  return gulp.src(src, { base: base })
    .pipe(gulp.dest(dest))
}

const watch = () => {
  Object.keys(tasks).forEach(task => {
    // Webpack will watch the js files
    // when hot reloading is anabled
    if (hot && task == 'scripts') return
    const glob = path.join(paths.src, tasks[task].paths.src, tasks[task].glob)
    exports[task]()
    gulp.watch(glob.split(path.sep).join('/'), exports[task])
  });
}

const serve = gulp.parallel(
  browsersync,
  watch
)

const build = gulp.series(clean, gulp.parallel(
  scriptsBuild,
  stylesBuild,
  images,
  fonts
))

gulp.task('clean', clean)
gulp.task('scripts', scripts)
gulp.task('scripts.build', scriptsBuild)
gulp.task('styles', styles)
gulp.task('styles.build', stylesBuild)
gulp.task('images', images)
gulp.task('fonts', fonts)
gulp.task('serve', serve)
gulp.task('watch', watch)
gulp.task('default', build)
gulp.task('build', build)

// tasks listetd in the tasks object
// must be exported so they can be
// called dynamically
exports.paths = paths
exports.tasks = tasks
exports.scripts = scripts
exports.styles = styles
exports.images = images
exports.fonts = fonts
