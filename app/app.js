/* eslint-disable */

// var offline = new WakJSCOffline.default({
//   wakJSC: WakJSC
// });
//
// offline.router.get('/$catalog/:param', offline.cacheFirst);
WakJSC.getCatalog().then(function (ds) {
  console.log(ds);

  ds.Employee.myDataClassMethod().then(function (e) {
    console.log(e);
  })
})
