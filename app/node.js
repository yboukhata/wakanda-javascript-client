/* eslint-disable */

var wakjsc = require('../build/wakjsc.node.js');

console.log(wakjsc);

var WakJSC = new wakjsc('http://localhost:8081');


WakJSC.directory.login('bar', 'bar').then(e => {
  console.log('login successfull', e);

  WakJSC.directory.currentUser().then(u => {
    console.log('user', u);
  })
  .catch(e => {
    console.log('current user error', e);
  });
})
.catch(e => {
  console.log('error caught', e);
})
