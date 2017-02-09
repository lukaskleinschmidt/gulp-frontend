var config = require('./gulp.config');
var webpack = require('webpack');
var path = require('path');

var task = config.tasks.scripts;

var webpackConfig = require('./webpack.config');

Object.keys(webpackConfig.entry).forEach(key => {
  var entry = webpackConfig.entry[key];
  webpackConfig.entry[key] = [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client?reload=true&quiet=' + task.plugins.webpack.quiet.toString() + '&overlay=' + task.plugins.webpack.overlay.toString(),
  ];
  webpackConfig.entry[key].push(entry);
});

webpackConfig.module.rules[0].use.push({loader: 'webpack-module-hot-accept'});

webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
webpackConfig.plugins.push(new webpack.NoEmitOnErrorsPlugin());

module.exports = webpackConfig;
