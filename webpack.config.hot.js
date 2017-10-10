const webpackConfig = require('./webpack.config');
const webpack       = require('webpack');

Object.keys(webpackConfig.entry).forEach(key => {
  var entry = webpackConfig.entry[key];
  webpackConfig.entry[key] = [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client?reload=true&quiet=true&overlay=false',
  ];
  webpackConfig.entry[key].push(entry);
});

webpackConfig.module.rules[0].use.push({loader: 'webpack-module-hot-accept'});

webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
webpackConfig.plugins.push(new webpack.NoEmitOnErrorsPlugin());

module.exports = webpackConfig;
