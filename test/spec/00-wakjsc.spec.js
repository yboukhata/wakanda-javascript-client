/* eslint-disable */

describe('WakandaClient object', function() {

  describe('public APIs', function() {
    it('should have a getCatalog method', function() {
      expect(wakClient.getCatalog).to.be.a('function');
    });

    it('should have a directory object', function () {
      expect(wakClient.directory).to.be.an('object');
    });
  });

  describe('version() method', function () {
    it('should be defined', function() {
      expect(wakClient.version).to.be.a('function');
    });

    it('should return a string', function () {
      expect(wakClient.version()).to.be.a('string');
    });
  });
});
