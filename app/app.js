/* eslint-disable */

WakJSC.getCatalog().then(function(ds) {
  var entity = ds.Employee.create([1,2]);
  console.log(entity);
});
