WakJSC.catalog.get()
  .then(function (ds) {
    console.log(ds);

    ds.Employee.find(2909294)
      .then(function (e) {
        console.log(e);
      });

  })
  .catch(function (err) {
    console.error(err);
  });
