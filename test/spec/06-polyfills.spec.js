describe('Polyfills', function () {

  function isBrowser() { 
    try {
      return typeof window === 'object';
    } catch (e) {
      return false;
    }
  }
  
  if(isBrowser()) {
    describe('window.CustomEvent', function () {
      it('should be defined', function () {
        expect(window.CustomEvent).to.be.a('function');
      });
    });    
  }
});