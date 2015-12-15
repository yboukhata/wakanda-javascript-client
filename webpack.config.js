var webpack = require('webpack');

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
