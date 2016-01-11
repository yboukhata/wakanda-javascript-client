/* eslint-disable */

WakJSC.getCatalog().then(function (ds) {
  console.log(ds);

  ds.Company.query().then(function (e) {
    e.entities[0].myEntityMethod().then(function (ee) {
      console.log(ee);
    })
  })
});
