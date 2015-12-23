var WakJSC = require('../build/wakjsc.node.js');

var w = new WakJSC('http://localhost:3030');

var a = w.catalog.get(['Toto'])
// .then(function (ds) {
//   console.log(ds);
// })
.catch(function (err) {
  console.error(err);
});

console.log(typeof a);
