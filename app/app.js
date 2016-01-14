/* eslint-disable */

WakJSC.getCatalog().then(function (ds) {
  console.log(ds);

  ds.Company.find(195176).then(function (company) {
    console.log(company);
    company.staff.fetch().then(function () {
      console.log(company);
    })
  });
});
