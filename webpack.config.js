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
      { from: './app/templates/borrow-form.html', to: "borrow-form.html" }
    ]),
    new CopyWebpackPlugin([
      { from: './app/templates/lend-form.html', to: "lend-form.html" }
    ])
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
