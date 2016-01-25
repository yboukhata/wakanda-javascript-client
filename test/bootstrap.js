/* eslint-disable */

var isBrowser = new Function("try { return this === window; } catch(e) { return false; }");
if (!isBrowser()) {
  var chai = require('chai');
  expect = chai.expect;

  var testEnv = process.env.TEST_ENV || 'integration';
  var serverInfo = require('./server.' + testEnv + '.json');

  var wakjsc = require('../build/wakjsc.node.js');
  WakJSC = new wakjsc(serverInfo.host + ':' + serverInfo.port);
}

beforeEach(function () {
  if (isBrowser()) {
    window.top.callPhantom({
      type: 'clearCookies'
    });
  }
  else {
    WakJSC._httpClient._clearCookie();
  }
});
