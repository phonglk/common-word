/* eslint-disable */
const webpack = require('webpack');
const path = require('path');

module.exports = {
  context: process.cwd(),
  entry: {
    standard: [
      'react',
      'react-dom',
      'lodash',
    ],
  },

  output: {
    filename: '[name].dll.js',
    path: path.join(__dirname, './dist/chrome'),
    library: '[name]',
  },

  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      path: path.join(__dirname, './dist/chrome', '[name]-manifest.json'),
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
  ],
};