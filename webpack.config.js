var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
    "./src/index.js"
  ],
  output: {
    filename: "[name].build.js",
    path: __dirname + "/build/",
    library: 'WakJSC',
    libraryTarget: 'umd'
  },
  devtool: 'source-map',
  resolve: {
    alias: {
      'aurelia-http-client': path.join(__dirname, './lib/aurelia-http-client')
    }
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: [
        /node_modules/
      ],
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      }
    }]
  }
};
