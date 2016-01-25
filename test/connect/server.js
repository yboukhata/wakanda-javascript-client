/* eslint-disable */

var http = require('http');
var connect = require('connect');
var serveStatic = require('serve-static');
var chalk = require('chalk');
var stream = require('stream');

var prism = require('connect-prism');
var crypto = require('crypto');
var PrismUtils = require('../../node_modules/connect-prism/lib/services/prism-utils');


var mode = process.argv[2] || 'mock';
if (mode === 'record') {
  mode = 'mockrecord';
}
console.log(chalk.yellow('Starting record/mocking test server with mode ' + mode + ' on port 3000'));

var prismUtils = new PrismUtils();

var mockFileName = function (config, req) {
  console.log('mockFileName called, body:' + req.body);
  var reqData = prismUtils.filterUrl(config, req.url);
  var url = req.url.replace(/\/|\$|\_|\?|\<|\>|\\|\:|\*|\||\"/g,'_');
  // include request body in hash

  var cookie = req.headers.cookie || "";
  reqData = req.body + reqData + cookie;

  var shasum = crypto.createHash('sha1');
  shasum.update(reqData);
  return url + '_' + 'WASID_' + cookie + '_' + shasum.digest('hex') + '.json';
}

prism.create({
  name: 'rest',
  context: '/rest',
  host: 'localhost',
  port: 8081,
  mode: mode,
  clearOnStart: true,
  mocksPath: __dirname + '/mocks',
  hashFullRequest: true,
  recordHeaders: ['Set-Cookie', 'WASID'],
  mockFilenameGenerator: mockFileName
});

var app = connect()
  // .use(function (req, res, next) {
  //   console.log('middleware yay');
  //
  //   var passThroughStream = stream.PassThrough();
  //   req.pipe(passThroughStream);
  //
  //   var buffer = '';
  //   passThroughStream.on('data', function(data) {
  //     buffer += data;
  //
  //     // Too much POST data, kill the connection!
  //     if (buffer.length > 1e6) {
  //       passThroughStream.connection.destroy();
  //     }
  //   });
  //
  //   passThroughStream.on('end', function() {
  //     passThroughStream.body = buffer;
  //     req.bodyStream = passThroughStream;
  //     req.body = buffer;
  //     next();
  //   });
  // })
  .use(function (req, res, next) {
    console.log('middleware yay');

    var buffer = '';
    req.on('data', function(data) {
      buffer += data;

      // Too much POST data, kill the connection!
      if (buffer.length > 1e6) {
        req.connection.destroy();
      }
    });

    req.on('end', function() {
      // passThroughStream.body = buffer;
      // req.bodyStream = passThroughStream;
      req.body = buffer;

      var bufferStream = new stream.PassThrough();
      bufferStream.end(new Buffer(buffer));
      req.bodyStream = bufferStream;

      next();
    });
  })
  .use(prism.middleware)
  .use(serveStatic('public'))
  .use(function(req, res){
    res.end('hello world\n');
  })

http.createServer(app).listen(3000);
