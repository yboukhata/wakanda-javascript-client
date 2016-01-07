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

  ds.Employee.query({pageSize: 1, filter: 'salary > 80000', select: 'employer.staff'}).then(function (er) {
    var e = er.entities[0];
    console.log(e);
debugger;
    e.firstName = "Foo";
    e.lastName = "Bar";

    e.save().then(function(ee) {
      console.log(ee);
    });
  });

  // ds.Employee.query({
  //   filter: 'firstName = :1',
  //   params: ['HARRY'],
  //   select: 'employer'
  // }).then(function (e) {
  //   console.log(e);
  // });


});
