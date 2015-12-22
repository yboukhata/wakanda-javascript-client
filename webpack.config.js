var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var baseConfig = {
  name: 'base',
  entry: [
    "./src/entry.browser.js"
  ],
  output: {
    filename: "wakjsc.js",
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
    },
    {
      test: /\.json$/,
      loader: 'json-loader'
    }]
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
      return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
      nodeModules[mod] = 'commonjs ' + mod;
  });

var nodeConfig = {
  name: 'node',
  entry: [
    "./src/entry.node.js"
  ],
  target: 'node',
  output: {
    filename: 'wakjsc.node.js',
    path: __dirname + "/build/",
    library: 'WakJSC',
    libraryTarget: 'umd'
  },
  devtool: baseConfig.devtool,
  resolve: baseConfig.resolve,
  externals: nodeModules,
  module: baseConfig.module,
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};


module.exports = [
  // baseConfig
  nodeConfig
];
