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

describe('Dataclass API', function() {

  var ds;
  var existingId;
  before(function (done) {
    WakJSC.getCatalog().then(function (ds_) {
      ds = ds_;
      ds.Employee.query({pageSize: 1}).then(function (c) {
        existingId = c.entities[0]._key;
        done();
      });
    });
  });

  describe('find method', function () {

    it('should be defined', function () {
      expect(ds.Employee.find).to.be.a('function');
    });

    it('should return a promise', function () {
      var find = ds.Employee.find(existingId);
      expect(find).to.be.a('promise');
      expect(find.then).to.be.a('function');
      expect(find.catch).to.be.a('function');
    });

    it('should retrieve an entity', function () {
      return ds.Employee.find(existingId).then(function (employee) {
        expect(employee).to.be.an('object');
        expect(employee._key).to.be.equal(existingId);
        expect(employee.firstName).to.be.a('string');
        expect(employee.lastName).to.be.a('string');
        expect(employee.salary).to.be.a('number');
        expect(employee.employerName).to.be.a('string');
        expect(employee.employer).to.be.an('object');
      });
    });

    it('should throw an error if id is not an integer or a string', function () {
      expect(function () {
        ds.Employee.find([12, 23])
      }).to.throw(Error);
    });

    it('should fail if the entity is not found', function () {
      return ds.Employee.find(404).catch(function (e) {
        expect(e).to.be.defined;
      });
    });

    it('should not expand related attributes by default', function () {
      return ds.Employee.find(existingId).then(function (employee) {
        expect(employee.employer.ID).to.be.defined;
        expect(employee.employer.name).to.be.undefined;
      });
    });

    it('should expand related attributes provided on select parameter', function () {
      return ds.Employee.find(existingId, {select: 'employer'}).then(function (employee) {
        expect(employee.employer.ID).to.be.defined;
        expect(employee.employer.name).to.be.a('string');
      });
    });

    it('should expand related attributes on several levels', function () {
      return ds.Employee.find(existingId, {select: 'employer,employer.staff'}).then(function (employee) {
        expect(employee.employer.ID).to.be.defined;
        expect(employee.employer.name).to.be.a('string');
        expect(employee.employer.staff).to.be.an('object');
        expect(employee.employer.staff.entities[0].firstName).to.be.a('string');
      });
    });
  });

  describe('query method', function () {

    it ('should be defined', function () {
      expect(ds.Employee.query).to.be.a('function');
    });

    it('should return a promise', function () {
      expect(ds.Employee.query({filter: 'ID > 0'})).to.be.a('promise');
    });

    it('should retrieve a collection of entity', function () {
      return ds.Employee.query({filter: 'ID > 0'}).then(function (collection) {
        expect(collection).to.be.an('object');
        expect(collection.entities).to.be.an('array');

        var employee = collection.entities[0];
        expect(employee).to.be.an('object');
        expect(employee.ID).to.be.an('number');
        expect(employee.firstName).to.be.a('string');
      });
    });

    it('should works if called without options', function () {
      return ds.Employee.query().then(function (collection) {
        expect(collection).to.be.an('object');
        expect(collection.entities).to.be.an('array');
      });
    });

    it('should not expand related entities by default', function () {
      return ds.Employee.query({filter: 'ID > 0'}).then(function (collection) {
        expect(collection).to.be.an('object');
        expect(collection.entities).to.be.an('array');

        var employee = collection.entities[0];
        expect(employee).to.be.an('object');
        expect(employee.employer).to.be.an('object');
        expect(employee.employer.name).to.be.undefined;
      });
    });

    it('should retrieve at most pageSize entity', function () {
      return ds.Employee.query({pageSize: 10}).then(function (collection) {
        expect(collection).to.be.an('object');
        expect(collection.entities).to.be.an('array');
        expect(collection.entities.length).to.be.at.most(10);
      });
    });

    it('should filter query with parameters placeholder', function () {
      return ds.Employee.query({filter: 'firstName = :1', params: ['ARON']}).then(function (collection) {
        expect(collection).to.be.an('object');
        expect(collection.entities).to.be.an('array');

        var employee = collection.entities[0];
        expect(employee).to.be.an('object');
        expect(employee.firstName).to.be.equal('ARON');
      });
    });

    it ('should expand related attributes on several levels', function () {
      return ds.Employee.query({select: 'employer.staff', pageSize: 3}).then(function (collection) {
        expect(collection).to.be.an('object');
        expect(collection.entities).to.be.an('array');
        expect(collection.entities.length).to.be.at.most(3);

        var entity = collection.entities[0];
        expect(entity).to.be.an('object');
        expect(entity.firstName).to.be.a('string');
        expect(entity.employer).to.be.an('object');
        expect(entity.employer.name).to.be.a('string');
        expect(entity.employer.staff).to.be.an('object');
        expect(entity.employer.staff.entities).to.be.an('array');
        expect(entity.employer.staff.entities.length).to.be.at.least(1);

        var subEntity = entity.employer.staff.entities[0];
        expect(subEntity).to.be.an('object');
        expect(subEntity.firstName).to.be.a('string');
      });
    });

    it('should sort result with orderBy', function () {
      return ds.Employee.query({orderBy: 'lastName', pageSize: 20}).then(function (collection) {

        expect(collection).to.be.an('object');
        expect(collection.entities).to.be.an('array');
        expect(collection.entities.length).to.be.at.least(2);
        expect(collection.entities.length).to.be.at.most(20);

        for (var i = 0; i < collection.entities.length - 1; i++) {
          expect(collection.entities[i].lastName).to.be.at.most(collection.entities[i + 1].lastName);
        }
      });
    });

    it ('should sort result in reverse order', function () {
      return ds.Employee.query({orderBy: 'salary desc', pageSize: 20}).then(function (collection) {
        expect(collection).to.be.an('object');
        expect(collection.entities).to.be.an('array');
        expect(collection.entities.length).to.be.at.least(2);
        expect(collection.entities.length).to.be.at.most(20);

        for (var i = 0; i < collection.entities.length - 1; i++) {
          expect(collection.entities[i].salary).to.be.at.least(collection.entities[i + 1].salary);
        }
      });
    })
  });
});
