var WakJSC = require('../build/wakjsc.node.js');

var w = new WakJSC('http://localhost:8081');

var a = w.catalog.get();

console.log(typeof a);
