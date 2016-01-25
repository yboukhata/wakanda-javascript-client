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

describe('Entity API', function () {
  var ds;

  before(function (done) {
    WakJSC.getCatalog().then(function (ds_) {
      ds = ds_;
      done();
    });
  });

  describe('save method', function () {

    it('sould be defined', function () {
      var entity = ds.Product.create();
      expect(entity.save).to.be.a('function');
    });

    it('should return a promise', function () {
      var entity = ds.Product.create();
      expect(entity.save()).to.be.a('promise');
    });

    it('should return the same entity object', function () {
      var entity = ds.Product.create();

      return entity.save().then(function (e) {
        expect(entity === e).to.be.true;
      });
    });

    it('should fill the _key property for a newly created entity', function () {
      return ds.Product.create().save().then(function (e) {
        expect(e._key).to.be.a('string');
      });
    });

    it('should fill the _stamp property for a newly created entity', function () {
      return ds.Product.create().save().then(function (e) {
        expect(e._stamp).to.be.a('number');
      });
    });

    it('should update the _stamp for an existing entity', function () {
      return ds.Product.query({pageSize: 1})
        .then(function (collection) {
          return collection.entities[0];
        })
        .then(function (entity) {
          var originalStamp = entity._stamp;
          entity.myBoolean = !entity.myBoolean;

          return entity.save().then(function () {
            expect(entity._stamp).to.be.above(originalStamp);
          });
        });
    });
  });
});
