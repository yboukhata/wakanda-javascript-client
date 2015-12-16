console.log(WakJSC);

WakJSC.catalog.get()
  .then(function (cat) {
    console.log(cat);
  })
  .catch(function (err) {
    console.error(err);
  });


// WakJSC.directory.login('bar', 'bar')
//   .then(function (e) {
//     console.log('login success', e);
//   })
//   .catch(function (err) {
//     console.error('login fail', err.message);
//   })
//
// var Employee = WakJSC.dataclassFactory.getDataclass('Employee');
//
// Employee.find(2909294)
//   .then(function (e) {
//     console.log(e);
//   })
