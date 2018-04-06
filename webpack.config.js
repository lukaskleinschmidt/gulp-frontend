const paths   = require('./gulpfile').paths
const task    = require('./gulpfile').tasks['scripts']
const path    = require('path')
const webpack = require('webpack')

module.exports = {
  context: path.resolve(__dirname, paths.src, task.paths.src),
  mode: 'development',
  entry: {
    'app': './app.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: ['babel-loader?presets=es2015'],
      exclude: /node_modules/
    }]
  },
  resolve: {
    alias: {
      modules: path.resolve(__dirname, paths.src, task.paths.src, 'modules'),
      module: path.resolve(__dirname, paths.src, task.paths.src, 'modules/module.js'),
    },
    modules: [
      path.resolve(__dirname, paths.src, task.paths.src),
      path.resolve(__dirname, 'node_modules')
    ]
  },
  optimization: {
    splitChunks: {
      name: 'commons',
      chunks: 'all'
    }
  },
  plugins: [],
  output: {
    path: path.resolve(__dirname, paths.dest, task.paths.dest),
    filename: '[name].js',
    publicPath: '/assets/scripts'
  }
}
