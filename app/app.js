/* eslint-disable */

WakJSC.directory.login('bar', 'bar', 31536000).then(function (e)  {
  console.log('login successfull', e);

  WakJSC.directory.currentUser().then(function (u) {
    console.log('user', u);
  })
  .catch(function (e) {
    console.log('current user error', e);
  });
})
.catch(function (e) {
  console.log('error caught', e);
})
