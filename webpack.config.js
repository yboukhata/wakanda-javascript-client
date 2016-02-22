var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var baseConfig = {
  name: 'base',
  entry: [
    "./src/entry.browser.ts"
  ],
  output: {
    filename: "wakjsc.js",
    path: __dirname + "/build/",
    library: 'WakJSC',
    libraryTarget: 'umd'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js'],
    alias: {
      'aurelia-http-client': path.join(__dirname, './lib/aurelia-http-client')
    }
  },
  module: {
    loaders: [{
      test: /\.ts$/,
      exclude: [
        /node_modules/
      ],
      loader: 'ts-loader'
    },
    {
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
    "./src/entry.node.ts"
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
  module: {
    loaders: baseConfig.module.loaders
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};


module.exports = [
  baseConfig,
  nodeConfig
];
