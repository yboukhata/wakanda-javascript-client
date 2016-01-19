/* eslint-disable */

WakJSC.getCatalog().then(function (ds) {
  console.log(ds);

  WakJSC.directory.login('bar', 'bar').then(function (e) {
    WakJSC.directory.currentUserBelongsTo('Admins').then(function (ee) {
      console.log(ee);
    });
  })
  // .catch(function () {
  //   console.log('auth failed');
  // });
});
