WakJSC.catalog.get()
  .then(function (ds) {
    console.log(ds);

    var e = ds.Employee.create({
      firstName: "foo",
      lastName: "bar",
      salaryProcessed: 23
    });
    console.log(e, JSON.stringify(e));

  })
  .catch(function (err) {
    console.error(err);
  });
