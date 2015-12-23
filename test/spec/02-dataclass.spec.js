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

    it('should return a promise', function () {
      var find = ds.Employee.find(10);
      expect(find).to.be.a('promise');
      expect(find.then).to.be.a('function');
      expect(find.catch).to.be.a('function');
    });

    it('should retrieve an entity', function () {
      return ds.Employee.find(10).then(function (employee) {
        expect(employee).to.be.an('object');
        expect(employee.ID).to.be.equal(10);
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
      return ds.Employee.find(10).then(function (employee) {
        expect(employee.employer.ID).to.be.defined;
        expect(employee.employer.name).to.be.undefined;
      });
    });

    it('should expand related attributes provided on select parameter', function () {
      return ds.Employee.find(10, {select: 'employer'}).then(function (employee) {
        expect(employee.employer.ID).to.be.defined;
        expect(employee.employer.name).to.be.a('string');
      });
    });

    it('should expand related attributes on several levels', function () {
      return ds.Employee.find(10, {select: 'employer,employer.staff'}).then(function (employee) {
        expect(employee.employer.ID).to.be.defined;
        expect(employee.employer.name).to.be.a('string');
        expect(employee.employer.staff).to.be.an('object');
        expect(employee.employer.staff.entities[0].firstName).to.be.a('string');
      });
    });
  });
});
