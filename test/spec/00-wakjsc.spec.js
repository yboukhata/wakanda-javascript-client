var isBrowser = new Function("try { return this === window; } catch(e) { return false; }");
if (!isBrowser()) {
  var chai = require('chai');
  var expect = chai.expect;

  var testEnv = process.env.TEST_ENV || 'unit';
  var serverInfo = require('../server.' + testEnv + '.json');

  var wakjsc = require('../../build/wakjsc.node.js');
  var WakJSC = new wakjsc(serverInfo.host + ':' + serverInfo.port);
}

describe('WakJSC module', function() {

  describe('public APIs', function() {
    it('should have a catalog object', function() {
      expect(WakJSC.catalog).to.be.an('object');
    });

    it('should have a directory object', function () {
      expect(WakJSC.directory).to.be.an('object');
    });
  });

  describe('version() method', function () {
    it('should be defined', function() {
      expect(WakJSC.version).to.be.a('function');
    });

    it('should return a string', function () {
      expect(WakJSC.version()).to.be.a('string');
    });

    if (!isBrowser()) {
      it('should return the same version as package.json', function () {
        var packageInfo = require('../../package.json');
        expect(WakJSC.version()).to.be.equal(packageInfo.version);
      });
    }
  });
});
