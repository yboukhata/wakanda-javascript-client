var WakJSC = require('../build/wakjsc.js');
var chai = require('chai');
var expect = chai.expect;

describe('Catalog API', function() {

  describe('get method', function() {
    it('should be defined', function() {
      expect(WakJSC.catalog.get).to.be.a('function');
    });
  });
});
