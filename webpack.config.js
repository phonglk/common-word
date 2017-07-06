/* eslint-disable */
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const babel = require('babel-core');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

function getVars(p) {
  const babelCode = babel.transformFileSync(path.resolve(p)).code;
  const header = 'const exports = {};';
  const footer = 'return exports;';
  const func = new Function(header + babelCode + footer);
  return func();
}
const passingVars = {
  modifyVars: Object.assign({}, 
    getVars('./src/const/style.js')
  )
}

module.exports = {
  entry: {
    'content': './src/content/index.js',
    'background': './src/background/index.js',
  },
  output: {
    path: path.join(__dirname, './dist/'),
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
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader', 
          loader:'css-loader!less-loader?'+JSON.stringify(passingVars)
        })
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
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
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require(path.join(__dirname, './dist/standard-manifest.json'))
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, './manifest.json'),
        to: 'manifest.json'
      },
      {
        from: path.join(__dirname, './icos'),
        to: './icos'
      },
      // {
      //   from: path.join(__dirname, './options/options.html'),
      //   to: './options.html'
      // },
      {
        from: path.join(__dirname, './src/background/background.html'),
        to: './background.html'
      },
    ]),
  ]
};
