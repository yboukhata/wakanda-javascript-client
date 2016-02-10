/* eslint-disable */

// var offline = new WakJSCOffline.default({
//   wakJSC: WakJSC
// });
//
// offline.router.get('/$catalog/:param', offline.cacheFirst);


WakJSC.getCatalog().then(function (ds) {
  console.log(ds);
  ds.Employee.query({pageSize: 5}).then(function (c) {
    console.log(c);

    debugger;
    c.more().then(function () {
      console.log(c);
      debugger;

      c.more().then(function () {
        console.log(c);
        debugger;

        c.more().then(function () {
          console.log(c);
          debugger;
        })
      })
    })
  })
})
