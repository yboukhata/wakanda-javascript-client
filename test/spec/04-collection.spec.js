describe('Collection API', function () {
  var ds;

  before(function (done) {
    wakClient.getCatalog().then(function (ds_) {
      ds = ds_;
      done();
    });
  });
  
  describe('User defined methods', function () {
    
    describe('on root collections', function () {
      var collection;
      
      before(function () {
        return ds.Company.query({pageSize: 5}).then(function (companies) {
          collection = companies;
        });
      });
      
      it('should be defined', function () {
        expect(collection.myCollectionMethod).to.be.a('function');
      });
      
      it('should return a promise', function () {
        expect(collection.myCollectionMethod()).to.be.a('promise');
      });
      
      it('should return the right value', function () {
        return collection.myCollectionMethod().then(function (result) {
          expect(result).to.be.equal('This is a call to my collection method (Company)');
        });
      });
    });
    
    describe('on expanded collections', function () {
      
      var collection;
      
      before(function () {
        return ds.Company.query({pageSize: 1, select: 'staff'}).then(function (companies) {
          collection = companies.entities[0].staff;
        });
      });
      
      it('should be defined', function () {
        expect(collection.myCollectionMethod).to.be.a('function');
      });
      
      it('should return a promise', function () {
        expect(collection.myCollectionMethod()).to.be.a('promise');
      });
      
      it('should return the right value', function () {
        return collection.myCollectionMethod().then(function (result) {
          expect(result).to.be.equal('Hello from collection employee ! There is 1 items on the collection.');
        });
      });
    });
    
    describe('on lazily fetched collections', function () {
      
      var collection;
      
      before(function () {
        return ds.Company.query({pageSize: 1}).then(function (companies) {
          return companies.entities[0].staff.fetch().then(function () {
            collection = companies.entities[0].staff;
          });
        });
      });
      
      it ('should be defined', function () {
        expect(collection.myCollectionMethod).to.be.a('function');
      });
      
      it('should return a promise', function () {
        expect(collection.myCollectionMethod()).to.be.a('promise');
      });
      
      it('should return the right value', function () {
        return collection.myCollectionMethod().then(function (result) {
          expect(result).to.be.equal('Hello from collection employee ! There is 1 items on the collection.');
        });
      });
    });
  });
});
