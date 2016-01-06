// WakJSC.catalog.get()
//   .then(function (ds) {
//     console.log(ds);
//
//     var e = ds.Employee.create({
//       firstName: "foo",
//       lastName: "bar",
//       salaryProcessed: 23
//     });
//     console.log(e, JSON.stringify(e));
//
//   })
//   .catch(function (err) {
//     console.error(err);
//   });

WakJSC.getCatalog().then(function (ds) {
  console.log(ds);

  // ds.Employee.find(2909253, {select: 'employer.staff'}).then(function (e) {
  //   console.log(e);
  // });

  // ds.Employee.query({
  //   filter: 'firstName = :1',
  //   params: ['HARRY'],
  //   select: 'employer'
  // }).then(function (e) {
  //   console.log(e);
  // });

  var e = ds.Employee.create({firstName: 'toto', lastName: 'bar', salary: 60000});
  console.log(e);
});
