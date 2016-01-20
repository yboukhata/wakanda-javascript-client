/* eslint-disable */

var http = require('http');
var connect = require('connect');
var prism = require('connect-prism');
var serveStatic = require('serve-static');
var chalk = require('chalk');

var mode = process.argv[2] || 'mock';
console.log(chalk.yellow('Starting record/mocking test server with mode ' + mode + ' on port 3000'));

prism.create({
  name: 'rest',
  context: '/rest',
  host: 'localhost',
  port: 8081,
  mode: mode,
  mocksPath: __dirname + '/mocks'
});

var app = connect()
  .use(prism.middleware)
  .use(serveStatic('public'))
  .use(function(req, res){
    res.end('hello world\n');
  })

http.createServer(app).listen(3000);
