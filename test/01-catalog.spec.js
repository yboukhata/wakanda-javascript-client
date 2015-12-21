var WakJSC = require('../build/wakjsc.js');
var chai = require('chai');
var expect = chai.expect;

describe('Catalog API', function() {

  describe('get method', function() {
    it('should be defined', function() {
      expect(WakJSC.catalog.get).to.be.a('function');
    });

    it('should return a promise', function () {
      var getCall = WakJSC.catalog.get();
      expect(getCall).to.be.an('object');
      expect(getCall.then).to.be.a('function');
      expect(getCall.catch).to.be.a('function');
    });

    it('should provide an object to promise callback', function (done) {
      WakJSC.catalog.get().then(function (ds) {
        expect(ds).to.be.an('object');
        done();
      });
    });
  });
});
