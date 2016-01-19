/* eslint-disable */

WakJSC.getCatalog().then(function (ds) {
  console.log(ds);

  ds.Company.query({pageSize: 10}).then(function (c) {
    console.log(c);
    debugger;
    c.nextPage().then(function () {
      console.log(c);
      debugger;
      c.nextPage().then(function () {
        console.log(c);
        debugger;
        c.nextPage().then(function () {
          console.log(c);
          debugger;
        });
      });
    });
  })
});
