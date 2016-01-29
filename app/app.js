/* eslint-disable */

// var WJSCOffline = WakJSC.plugin.offline;

var offline = new WakJSCOffline.default({
  wakJSC: WakJSC
});



WakJSC.getCatalog().then(function (ds) {
  ds.Product.query().then(function (c) {
    console.log(c);
  });
}).catch(function (e) {
  console.error('catalog failed', e);
});


WakJSC.directory.login('bar', 'bar').then(function () {
  console.log('logged in');
}).catch(function (e) {
  console.error('login error', e);
});
