/* eslint-disable */

WakJSC._httpClient.registerRequestInterceptor('GET', function (options) {
  console.log('GET interceptor', options);
  throw new Error('No GET request allowed');
});

WakJSC._httpClient.registerRequestInterceptor('POST', function (options) {
  console.log('POST interceptor', options);
  throw new Error('No POST request allowed');
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
