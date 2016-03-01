/* eslint-disable */


describe('Entity API', function () {
  var ds;

  before(function (done) {
    wakClient.getCatalog().then(function (ds_) {
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

    it('should throw an error when called on a non-saved entity', function () {
      var entity = ds.Product.create();
      expect(function () {
        entity.delete();
      }).to.throw(Error);
    });
  });

  describe('fetch method', function () {
    it ('should be defined', function () {
      var entity = ds.Product.create();
      expect(entity.fetch).to.be.a('function');
    });

    it('should return a promise', function () {
      return ds.Employee.query({pageSize: 1, filter: 'employer.ID > 0'})
        .then(function (collection) {
          var employee = collection.entities[0];
          expect(employee.employer.fetch()).to.be.a('promise');
        });
    });

    it('should fetch a deferred related entity', function () {
      return ds.Employee.query({pageSize: 1, filter: 'employer.ID > 0'})
        .then(function (collection) {
          var employee = collection.entities[0];
          return employee.employer.fetch();
        })
        .then(function (company) {
          expect(company).to.be.an('object');
          expect(company._stamp).to.be.a('number');
          expect(company._key).to.be.a('string');
          expect(company.name).to.be.a('string');
        });
    });

    it('should update the fetched entity', function () {
      var employee;

      return ds.Employee.query({pageSize: 1, filter: 'employer.ID > 0'})
        .then(function (collection) {
          employee = collection.entities[0];
          return employee.employer.fetch();
        })
        .then(function (company) {
          expect(company === employee.employer).to.be.true;
        });
    });

    it('should refresh an already fetched entity', function () {
      var product, originalName;

      //Skipping some product as we removed some of it on previous tests
      return ds.Product.query({pageSize: 1, start: 10})
        .then(function (collection) {
          product = collection.entities[0];
          originalName = product.name;
          product.name = "Brand New Product Name";

          return product.fetch();
        })
        .then(function () {
          expect(product.name === originalName);
        });
    });
  });

  describe('user defined methods', function () {

    it('should be defined', function () {
      return ds.Employee.query({pageSize: 1})
        .then(function (collection) {
          var employee = collection.entities[0];

          expect(employee.myEntityMethod).to.be.a('function');
        });
    });

    it('should return a promise', function () {
      return ds.Employee.query({pageSize: 1})
        .then(function (collection) {
          var employee = collection.entities[0];

          expect(employee.myEntityMethod()).to.be.a('promise');
        });
    });

    it('should return the right value', function () {
      var employee;

      return ds.Employee.query({pageSize: 1})
        .then(function (collection) {
          employee = collection.entities[0];

          return employee.myEntityMethod();
        })
        .then(function (result) {
          expect(result).to.be.equal('Hello from ' + employee.firstName + ' ' + employee.lastName);
        });
    });

    it('should fail if called on an unsaved entity', function () {
      var employee = ds.Employee.create();

      expect(function () {
        employee.myEntityMethod()
      }).to.throw(Error);
    });
  });
});
