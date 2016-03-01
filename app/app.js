wakClient.getCatalog().then(function (ds) {
  console.log(ds);

  ds.Employee.myDataClassMethod().then(function (e) {
    console.log(e);
  })
})
