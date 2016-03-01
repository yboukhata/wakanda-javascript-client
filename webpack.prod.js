var webpack = require('webpack');

var packageInfo = require('./package.json');
var configs = require('./webpack.config.js');

var browserConfig = configs[0];
var nodeConfig = configs[1];

var date = new Date();
var month = date.getMonth() + 1;
var dateStr = date.getFullYear() + '-' + (month < 10 ? '0' : '') + month + '-' + date.getDate(); 

//Browser bundle
browserConfig.output.filename = 'wakanda-client.min.js';

browserConfig.plugins = [
  new webpack.optimize.UglifyJsPlugin({minimize: true}),
  new webpack.BannerPlugin('wakanda-client.js - v' + packageInfo.version + ' - ' + dateStr)
];

//Node bundle
nodeConfig.output.filename = 'wakanda-client.node.min.js';

nodeConfig.plugins = [
  new webpack.optimize.UglifyJsPlugin({minimize: true}),
  new webpack.BannerPlugin('wakanda-client.node.js - v' + packageInfo.version + ' - ' + dateStr)
];

module.exports = [
  browserConfig,
  nodeConfig
];
