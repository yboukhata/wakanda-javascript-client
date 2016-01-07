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

  ds.Company.query().then(function (e) {
    e.entities[0].myEntityMethod().then(function (ee) {
      console.log(ee);
    });
  });
//   ds.Employee.query({pageSize: 1, filter: 'salary > 80000', select: 'employer.staff'}).then(function (er) {
//     var e = er.entities[0];
//     console.log(e);
// debugger;
//     e.firstName = "Foo";
//     e.lastName = "Bar";
//
//     e.save().then(function(ee) {
//       console.log(ee);
//     });
//   });

  // ds.Employee.query({
  //   filter: 'firstName = :1',
  //   params: ['HARRY'],
  //   select: 'employer'
  // }).then(function (e) {
  //   console.log(e);
  // });

  //employer 184202
  // ds.Company.find(184202).then(function (company) {
  //   var e = ds.Employee.create({
  //     firstName: 'toto',
  //     lastName: 'tata',
  //     employer: company
  //   });
  //   console.log(e);
  //   e.save().then(function (ee) {
  //     console.log(ee);
  //   });
  // });

  // ds.Employee.find(2971317).then(function (employee) {
  //   console.log(employee);
  //   debugger;
  //   employee.employer = null;
  //   employee.salary = 1234;
  //   employee.save().then(function (ee) {
  //     console.log(ee);
  //     ee.save();
  //   })
  // })

});
