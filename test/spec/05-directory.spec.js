/* eslint-disable */

var isBrowser = new Function("try { return this === window; } catch(e) { return false; }");
if (!isBrowser()) {
  var chai = require('chai');
  var expect = chai.expect;

  var testEnv = process.env.TEST_ENV || 'integration';
  var serverInfo = require('../server.' + testEnv + '.json');

  var wakjsc = require('../../build/wakjsc.node.js');
  var WakJSC = new wakjsc(serverInfo.host + ':' + serverInfo.port);
}

describe('Directory API', function () {

  var dir;
  before(function () {
    dir = WakJSC.directory;
  })

  describe('login method', function () {

    it('should be defined', function () {
      expect(dir.login).to.be.a('function');
    });

    it('should return a promise', function () {
      var p = dir.login();
      expect(p).to.be.a('promise');

      //Silence the error report by Karma because there is a unhandled promise rejection
      p.catch(function () {
      });
    });

    it('should resolve with correct credentials', function () {
      return dir.login('bar', 'bar').then(function (result) {
        expect(result).to.be.true;
      });
    });

    it('should fail with bad credentials', function (done) {
      dir.login('bad', 'credentials').catch(function () {
        done();
      });
    });

    it('should fail without any credentials', function (done) {
      dir.login().catch(function () {
        done();
      });
    });
  });

  describe('logout method', function () {
    it('should be defined', function () {
      expect(dir.logout).to.be.a('function');
    });

    it('should return a promise', function () {
      expect(dir.logout()).to.be.a('promise');
    });
  });
});
