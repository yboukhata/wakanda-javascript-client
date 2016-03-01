/* eslint-disable */

var WakandaClient = require('../dist/wakanda-client.node.js');

console.log(WakandaClient);

var wakClient = new WakandaClient('http://localhost:8081');


wakClient.directory.login('bar', 'bar').then(e => {
  console.log('login successfull', e);

  wakClient.directory.currentUser().then(u => {
    console.log('user', u);
  })
  .catch(e => {
    console.log('current user error', e);
  });
})
.catch(e => {
  console.log('error caught', e);
})
