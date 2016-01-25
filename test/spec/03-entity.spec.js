/* eslint-disable */


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

    it('should store the given attributes', function () {
      var entity = ds.Product.create({
        name: 'FooProduct',
        myBoolean: true,
        spec: {
          foo: 'bar',
          number: 1234,
          subObject: {
            baz: 'taz'
          }
        }
      });

      return entity.save()
        .then(function () {
          expect(entity.ID).to.be.a('number');
          expect(entity.name).to.be.equal('FooProduct');
          expect(entity.myBoolean).to.be.true;
          expect(entity.spec).to.be.an('object');
          expect(entity.spec.foo).to.be.equal('bar');
          expect(entity.spec.number).to.be.equal(1234);
          expect(entity.spec.subObject).to.be.an('object');
          expect(entity.spec.subObject.baz).to.be.equal('taz');
        });
    });

    it('should store related entity', function () {

      return ds.Company.query({pageSize: 1})
        .then(function (companies) {
          return companies.entities[0];
        })
        .then(function (company) {
          var entity = ds.Employee.create({
            firstName: 'John',
            lastName: 'Smith',
            salary: 80000,
            employer: company
          });

          return entity.save().then(function () {
            expect(entity.employer).to.be.an('object');
            expect(entity.employer._key).to.be.equal(company._key);
            expect(entity.employerName).to.be.equal(company.name);
          });
        });
    });

    it('should unlink related entity by passing a null value', function () {
      return ds.Employee.query({pageSize: 1, filter: 'employer.ID > 0'})
        .then(function (collection) {
          return collection.entities[0];
        })
        .then(function (employee) {
          employee.employer = null;
          return employee.save();
        })
        .then(function (employee) {
          expect(employee.employer).to.be.null;
        });
    });
  });

  describe('delete method', function () {
    it('sould be defined', function () {
      return ds.Product.query({pageSize: 1})
        .then(function (collection) {
          return collection.entities[0];
        })
        .then(function (product) {
          expect(product.delete).to.be.a('function');
        });
    });

    it('should return a promise', function () {
      return ds.Product.query({pageSize: 1})
        .then(function (collection) {
          expect(collection.entities[0].delete()).to.be.a('promise');
        });
    });

    it('should delete the entity', function () {
      return ds.Product.query({pageSize: 1})
        .then(function (collection) {
          var product = collection.entities[0];
          var productId = product._key;

          return product.delete().then(function () {
            return ds.Product.find(productId).catch(function (e) {
              expect(e).to.be.defined;
            });
          });
        });
    });

    it('should throw an error when called on non-saved entity', function () {
      var entity = ds.Product.create();
      expect(function () {
        entity.delete();
      }).to.throw(Error);
    });
  });
});
