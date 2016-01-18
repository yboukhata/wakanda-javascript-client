/* eslint-disable */

WakJSC.getCatalog().then(function (ds) {
  console.log(ds);

  ds.Product.query({pageSize: 1}).then(function (products) {
    var p = products.entities[0];
    console.log(p);

    var sendBtn = document.getElementById('btn');
    sendBtn.addEventListener('click', function () {
      var file = document.getElementById('input').files[0];
      p.photo.upload(file, file.type).then(function (e) {
        console.log(e);
        debugger;
      })
    })
  });
});
