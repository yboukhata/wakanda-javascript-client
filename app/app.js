/* eslint-disable */

WakJSC.getCatalog().then(function (ds) {
  console.log(ds);

  ds.Employee.query().then(function (e) {
    e.entities[0].employer.fetch().then(function (ee) {
      console.log(ee);
    })
  })
});
