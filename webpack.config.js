const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    'app': path.resolve(__dirname, 'resources/scripts/app.js'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { useBuiltIns: 'usage', modules: false, corejs: 3 }],
            ]
          }
        }
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'resources/scripts'),
    },
    modules: [
      path.resolve(__dirname, 'node_modules'),
    ]
  },
  optimization: {
    // splitChunks: {
    //   chunks: 'all',
    // }
  },
  plugins: [
    //
  ],
  output: {
    path: path.resolve(__dirname, 'public/assets/scripts'),
    filename: '[name].js',
    publicPath: '/assets/scripts/',
  }
}
