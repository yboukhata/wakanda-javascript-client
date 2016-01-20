/* eslint-disable */

var wakjsc = require('../build/wakjsc.node.js');
var WakJSC = new wakjsc('http://localhost:3000');


WakJSC.getCatalog().then(function(ds) {

  ds.Employee.myDataClassMethod('foo', 'bar').then(function (result) {
    console.log('result:', result);
  })
  .catch(function (e) {
    console.error('error:', e);
  });
});
