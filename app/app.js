WakJSC.catalog.get(['Foo'])
  .then(function (ds) {
    console.log(ds);

    ds.Employee.find(2909294, {select: 'employer'})
      .then(function (e) {
        console.log(e);
      });

  })
  .catch(function (err) {
    console.error(err);
  });
