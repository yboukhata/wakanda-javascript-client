import {HttpClient as AureliaHttpClient} from 'aurelia-http-client';

class HttpClient {

  constructor() {
    this.client = new AureliaHttpClient();
  }

  getCatalog() {
    this.client.get('/rest/$catalog')
      .then(result => {
        debugger;
      })
      .catch(err => {
        console.error('error happened', err);
      });
  }
}

export default HttpClient;
