/* eslint-disable */
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const babel = require('babel-core');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

function getVars(p) {
  const babelCode = babel.transformFileSync(path.resolve(p)).code;
  const header = 'const exports = {};';
  const footer = 'return exports;';
  const func = new Function(header + babelCode + footer);
  return func();
}
const passingVars = {
  modifyVars: Object.assign({}, 
    getVars('./src/const/class-name.js'), 
    getVars('./src/const/configuration.js')
  ),
}

module.exports = {
  entry: {
    'content': './src/content/index.js',
    'background': './src/background/index.js',
  },
  output: {
    path: path.join(__dirname, './dist/chrome/'),
    filename: '[name].js'
  },
  node: {
    fs: "empty"
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /.less$/,
        // loader: 'style-loader!css-loader!less-loader?'+JSON.stringify(passingVars),
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader', 
          loader:'css-loader!less-loader?'+JSON.stringify(passingVars)
        })
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
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      // {
      //   test: /\.html$/,
      //   loader: 'html'
      // }
    ]
  },
  resolve: {
    extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, 'src'),
    ]
  },
  plugins: [
    new ExtractTextPlugin("style.css"),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require(path.join(__dirname, './dist/chrome/standard-manifest.json'))
    })
  ]
};
