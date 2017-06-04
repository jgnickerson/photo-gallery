var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /(node_modules)/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }, {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        },
      }
    ]
  },

  stats: {
    colors: true
  }
};
