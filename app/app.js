/* eslint-disable */

WakJSC.getCatalog().then(function (ds) {
  console.log(ds);

  ds.Company.query({pageSize: 2}).then(function(c) {
    console.log(c);
    c.fetch().then(function () {
      console.log(c);
    });
  })
});
