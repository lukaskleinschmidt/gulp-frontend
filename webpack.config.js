var config = require('./gulp.config');
var webpack = require('webpack');
var path = require('path');

var task = config.tasks.scripts;

var entry = task.plugins.webpack.entry;
var plugins = [];

if(task.plugins.webpack.commons) {
  plugins.push(new webpack.optimize.CommonsChunkPlugin({
    name: 'commons',
    filename: 'commons.js',
    minChunks: 2,
  }));
}

module.exports = {
  context: path.resolve(__dirname, config.roots.src, task.roots.src),
  entry: entry,
  module: {
    rules: [{
      test: /\.js$/,
      use: ['babel-loader?presets=es2015'],
      exclude: /node_modules/,
    }],
  },
  plugins: plugins,
  output: {
    path: path.resolve(__dirname, config.roots.dest, task.roots.dest),
    filename: '[name].js',
    publicPath: '/' + task.roots.dest,
  },
};
