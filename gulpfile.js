// To enable hot reloading modify the
// serve and watch task accordingly

exports.roots = {
  public: 'public',
  dest:   'public/assets',
  src:    'assets',
};

exports.tasks = {
  scripts: {
    glob: '/**/*.js',
    roots: {
      src:  'scripts',
      dest: 'scripts',
    },
  },

  styles: {
    glob: '/**/*.scss',
    roots: {
      src:  'styles',
      dest: 'styles',
    },
  },

  images: {
    glob: '/**/*',
    roots: {
      src:  'images',
      dest: 'images',
    },
  },

  fonts: {
    glob: '/**/*.{eot,svg,ttf,woff,woff2}',
    roots: {
      src:  'fonts',
      dest: 'fonts',
    },
  },
}

require('require-dir')('./tasks');
