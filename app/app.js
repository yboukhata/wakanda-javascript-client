/* eslint-disable */

WakJSC.getCatalog().then(function (ds) {
  console.log(ds);

  WakJSC.directory.login('bar', 'bar').then(function (e) {
    WakJSC.directory.logout().then(function () {
      WakJSC.directory.currentUser().then(function (user) {
        console.log(user);
      });
    });
  })
  .catch(function () {
    console.log('auth failed');
  });
});
