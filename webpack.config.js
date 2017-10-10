const roots   = require('./gulpfile').roots;
const task    = require('./gulpfile').tasks['scripts'];
const path    = require('path');
const webpack = require('webpack');
const plugins = [];

plugins.push(new webpack.optimize.CommonsChunkPlugin({
  name: 'commons',
  filename: 'commons.js',
  minChunks: 2,
}));

module.exports = {
  context: path.resolve(__dirname, roots.src, task.roots.src),
  entry: {
    'app': './app.js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: ['babel-loader?presets=es2015'],
      exclude: /node_modules/,
    }],
  },
  resolve: {
    alias: {
      component: path.resolve(__dirname, roots.src, task.roots.src, 'components/component.js'),
    },
    modules: [
      path.resolve(__dirname, roots.src, task.roots.src),
      path.resolve(__dirname, 'node_modules'),
    ],
  },
  plugins: plugins,
  output: {
    path: path.resolve(__dirname, roots.dest, task.roots.dest),
    filename: '[name].js',
    publicPath: '/assets/scripts',
  },
};
