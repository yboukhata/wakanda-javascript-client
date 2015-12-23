var isBrowser = new Function("try { return this === window; } catch(e) { return false; }");
if (!isBrowser()) {
  var chai = require('chai');
  var expect = chai.expect;

  var testEnv = process.env.TEST_ENV || 'unit';
  var serverInfo = require('../server.' + testEnv + '.json');

  var wakjsc = require('../../build/wakjsc.node.js');
  var WakJSC = new wakjsc(serverInfo.host + ':' + serverInfo.port);
}

describe('Dataclass API', function() {

  describe('find method', function () {

    var ds;
    before(function (done) {
      WakJSC.catalog.get().then(function (ds_) {
        ds = ds_;
        done();
      });
    });

    it('should be defined', function () {
      expect(ds.Employee.find).to.be.a('function');
    });

    it('should retrieve an entity', function () {

    });
  });
});
