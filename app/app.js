WakJSC.catalog.get()
  .then(function (ds) {
    console.log(ds);

    ds.Employee.query({
      pageSize: 5,
      filter: 'salary < :1',
      params: [10000],
      orderBy: 'lastName desc, firstName'
    })
      .then(function (e) {
        console.log(e);
        e.entities.forEach(function (a) {
          console.log(a.lastName, a.firstName);
        });
      });

  })
  .catch(function (err) {
    console.error(err);
  });
