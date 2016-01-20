/* eslint-disable */

WakJSC.getCatalog().then(function(ds) {
  ds.Employee.myDataClassMethod('foo', 'bar').then(function (result) {
    console.log(result);
  });
});
