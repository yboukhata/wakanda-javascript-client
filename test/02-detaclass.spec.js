var isBrowser = new Function("try { return this === window; } catch(e) { return false; }");
if (!isBrowser()) {
  var wakjsc = require('../build/wakjsc.node.js');
  var WakJSC = new wakjsc('http://localhost:8081');
  var chai = require('chai');
  var expect = chai.expect;
}

describe('Dataclass API', function() {

});
