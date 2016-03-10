/* global wakClient */
/* global before */
/* global beforeEach */
/* global describe */
/* global it */
/* global expect */

describe('Collection API', function () {
  var ds;

  before(function (done) {
    wakClient.getCatalog().then(function (ds_) {
      ds = ds_;
      done();
    });
  });
  
  describe('metadata', function () {
    
    var collection;
    
    before(function () {
      return ds.Company.query({pageSize: 5}).then(function (c) {
        collection = c;
      });
    });
    
    it('should have a _count property', function () {
      expect(collection._count).to.be.a('number');
    });
    
    it('should have a _deferred property', function () {
      expect(collection._deferred).to.be.a('boolean');
    });
    
    it('should have a _first property', function () {
      expect(collection._first).to.be.a('number');
    });
    
    it('should have a _pageSize property', function () {
      expect(collection._pageSize).to.be.a('number');
    });
    
    it('should have a _sent property', function () {
      expect(collection._sent).to.be.a('number');
    });
    
    it('should have an entities array', function () {
      expect(collection.entities).to.be.an('array');
    });
  });
  
  describe('fetch method', function () {
    
    var collection;
    
    beforeEach(function () {
      return ds.Company.query({pageSize: 5}).then(function (c) {
        collection = c;
      });
    });
    
    it('should be defined', function () {
      expect(collection.fetch).to.be.a('function');
    });
    
    it ('should return a promise', function () {
      expect(collection.fetch()).to.be.a('promise');
    });
    
    it('should fetch a deferred collection', function () {
      var c = collection.entities[0];
      
      expect(c.staff._deferred).to.be.true;
      return c.staff.fetch().then(function () {
        expect(c.staff._deferred).to.be.false;
      });
    });
    
    it('should refresh an already fetched collection', function () {
      var oldCollectionSize = collection.entities.length;
      collection.entities = [];
      
      return collection.fetch().then(function () {
        expect(collection.entities.length).to.be.equal(oldCollectionSize);
      });
    });
    
    it('should change page size of an already fetched collection if a new one if given', function () {
      var oldPageSize = collection._pageSize;
      
      return collection.fetch({pageSize: oldPageSize * 3}).then(function () {
        expect(collection._pageSize).to.be.equal(oldPageSize * 3);
      });
    });
    
    it('should keep previously pageSize option of an already fetched collection if called without any', function () {
      var oldPageSize = collection._pageSize;
      
      return collection.fetch().then(function () {
        expect(collection._pageSize).to.be.equal(oldPageSize);
      });
    });
    
    it('should throw an error if called with invalid options', function () {
      expect(function () {
        collection.fetch({method: 'foo'});
      }).to.throw(Error);
    });
    
    it('should throw an error if called with select and deferred', function () {
      expect(function () {
        collection.entities[0].staff.fetch({select: 'employer'});
      }).to.throw(Error);
    });
    
    it('should retrieve at most pageSize entities', function () {
      var staff = collection.entities[0].staff;
      
      return staff.fetch({pageSize: 10}).then(function () {
        expect(staff.entities.length).to.be.at.most(10);
        expect(staff._pageSize).to.be.equal(10);
        expect(staff._sent).to.be.at.most(10);
      });
    });
    
    it('should skip start entities', function () {
      var staff = collection.entities[0].staff;
      
      return staff.fetch({start: 10}).then(function () {
        expect(staff._first).to.be.equal(10);
      })
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
