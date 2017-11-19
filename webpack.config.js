const path = require('path');
var webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './app/javascripts/app.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.js'
  },
  plugins: [
    // Copy our app's index.html to the build folder.
    new CopyWebpackPlugin([
      { from: './app/index.html', to: "index.html" }
    ]),
    new CopyWebpackPlugin([
      { from: './app/templates/borrower.html', to: "borrower.html" }
    ]),
    new CopyWebpackPlugin([
      { from: './app/templates/lender.html', to: "lender.html" }
    ]),
    new CopyWebpackPlugin([
      { from: './app/templates/home.html', to: "home.html" }
    ]),
    new CopyWebpackPlugin([
      { from: './app/css/borrower.css', to: "borrwer.css"}
    ]),
    new CopyWebpackPlugin([
      { from: './app/css/home.css', to: "home.css"}
    ]),
  ],
  module: {
    rules: [
      {
       test: /\.css$/,
       use: [ 'style-loader', 'css-loader' ]
      }
    ],
    loaders: [
      { test: /\.json$/, use: 'json-loader' },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
          plugins: ['transform-runtime']
        }
      }
    ]
  }
}
