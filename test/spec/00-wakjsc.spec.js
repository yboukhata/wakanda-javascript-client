/* eslint-disable */

describe('WakJSC module', function() {

  describe('public APIs', function() {
    it('should have a getCatalog method', function() {
      expect(WakJSC.getCatalog).to.be.a('function');
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
  });
});
