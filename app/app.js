wakClient.getCatalog().then(function (ds) {
  console.log(ds);

    ds.Product.query({pageSize: 1}).then(function (c) {
      var e = c.entities[0];
      console.log(e);
      
      e.photo.delete();
      
      document.getElementById('btn').addEventListener('click', function () {
        console.log('click on btn');
        var file = document.getElementById('input').files[0];
        
        e.photo.upload(file).then(function () {
          console.log(e);
        })
      })
      
    });
})