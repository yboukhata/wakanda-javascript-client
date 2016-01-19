/* eslint-disable */

WakJSC.getCatalog().then(function(ds) {
  console.log(ds);

  ds.Company.query({
    pageSize: 100
  }).then(function(c) {

    console.log(c);
    c.nextPage().then(function() {
      console.log(c);
      c.nextPage().then(function() {
        console.log(c);
        c.prevPage().then(function() {
          console.log(c);
          c.prevPage().then(function() {
            console.log(c);
          })
        })
      })
    })
  })
});
