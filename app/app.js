/* eslint-disable */

// var offline = new WakJSCOffline.default({
//   wakJSC: WakJSC
// });
//
// offline.router.get('/$catalog/:param', offline.cacheFirst);

console.log(WakJSC.helper.isEntity(null));
console.log(WakJSC.helper.isEntity(undefined));
console.log(WakJSC.helper.isEntity({}));

WakJSC.getCatalog().then(function (ds) {
  console.log(ds);

  ds.Employee.oneEmployee().then(function (e) {
    console.log(e);
    console.log(WakJSC.helper.isEntity(e));
    console.log(WakJSC.helper.isCollection(e));
  })

  ds.Employee.lotsOfEmployees().then(function (e) {
    console.log(e);
    console.log(WakJSC.helper.isEntity(e));
    console.log(WakJSC.helper.isCollection(e));
  })

  ds.Company.query({pageSize: 1}).then(function (c) {
    c.entities[0].me().then(function (e) {
      console.log(e);
      console.log(WakJSC.helper.isEntity(e));
      console.log(WakJSC.helper.isCollection(e));
    })
  })
})
