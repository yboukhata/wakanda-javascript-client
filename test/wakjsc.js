var WakJSC = require('../build/wakjsc.js');
var chai = require('chai');
var expect = chai.expect;

describe('WakJSC module', function() {
  describe('version() method', function () {
    it('should be defined', function() {
      expect(WakJSC.version).to.be.a('function');
    });
    it('should return a string', function () {
      expect(WakJSC.version()).to.be.a('string');
    });
  });

  describe('public APIs', function() {
    it('should have a catalog object', function() {
      expect(WakJSC.catalog).to.be.an('object');
    });
  });
});
