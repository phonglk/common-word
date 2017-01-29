/* eslint-disable */
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

module.exports = {
  entry: {
    'content': './src/content/index.js',
    'background': './src/background/index.js',
  },
  output: {
    path: path.join(__dirname, './dist/chrome/'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.css|\.less$/,
        loader: 'style-loader!css-loader!less-loader',
      },
      // {
      //   test: /\.(eot|woff|woff2|ttf)(\?.*$|$)/,
      //   loader: 'base64-font-loader'
      // },
      // {
      //   test: /\.(svg|png|jpg)(\?.*$|$)/,
      //   loader: 'url-loader?limit=30000&name=./assert/[name].[ext]'
      // },
      {
        test: /\.jsx$|\.js$|\.es6$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      // {
      //   test: /\.html$/,
      //   loader: 'html'
      // }
    ]
  },
  plugins: []
};
