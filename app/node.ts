import {WakandaClient, DataClassBaseService} from '../';

console.log(WakandaClient);
console.log(DataClassBaseService);

var client = new WakandaClient('http://localhost:8081');


DataClassBaseService.query({
  httpClient: client._httpClient,
  options: {pageSize: 5},
  dataClassName: 'Product'
}).then(c => {
  console.log(c);
  
}).catch(e => {
  console.error(e)
})