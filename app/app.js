/* eslint-disable */

WakJSC.getCatalog().then(function (ds) {
  console.log(ds);

  ds.Employee.query({pageSize: 1}).then(function (collection) {
    var e = collection.entities[0];

    console.log(e);

    e.employer.fetch().then(function (ee) {
      console.log(e);
      console.log(ee);
    });
  });
});
