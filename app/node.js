"use strict";
var _1 = require('../');
console.log(_1.WakandaClient);
console.log(_1.DataClassBaseService);
var client = new _1.WakandaClient('http://localhost:8081');
_1.DataClassBaseService.query({
    httpClient: client._httpClient,
    options: { pageSize: 5 },
    dataClassName: 'Product'
}).then(function (c) {
    console.log(c);
}).catch(function (e) {
    console.error(e);
});
