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

describe('Catalog API', function() {

  describe('getCatalog method', function() {

    it('should return a promise', function () {
      var getCall = WakJSC.getCatalog();

      expect(getCall).to.be.a('promise');
      expect(getCall.then).to.be.a('function');
      expect(getCall.catch).to.be.a('function');
    });

    it('should provide an object to promise callback', function () {
      return WakJSC.getCatalog().then(function (ds) {
        expect(ds).to.be.an('object');
      });
    });

    it('should retrieve all dataclasses without a given parameter', function () {
      return WakJSC.getCatalog().then(function (ds) {
        expect(ds.Company).to.be.an('object');
        expect(ds.Employee).to.be.an('object');
        expect(ds.Product).to.be.an('object');
      });
    });

    it('should retrieve only given dataclasses', function () {
      return WakJSC.getCatalog(['Employee', 'Company']).then(function (ds) {
        expect(ds.Company).to.be.an('object');
        expect(ds.Employee).to.be.an('object');
        expect(ds.Product).to.be.undefined;
      });
    });

    it('should fail trying to retrieve an unknown dataclass', function () {
      return WakJSC.getCatalog(['Foo']).catch(function (e) {
        expect(e).to.be.defined;
      });
    });

    it('should fail if given parameter is not an array', function () {
      expect(function () {
        WakJSC.getCatalog('Foo')
      }).to.throw(Error);
    });
  });
});
