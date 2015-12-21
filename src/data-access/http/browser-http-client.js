import HttpClient from './http-client';
import {HttpClient as AureliaHttpClient} from 'aurelia-http-client';

class BrowserHttpClient extends HttpClient {

  constructor({apiPrefix}) {
    super({apiPrefix});
    this.client = new AureliaHttpClient();
  }

  get({uri}) {
    return this.client.createRequest(this.prefix + uri)
      .asGet()
      .send();
  }

  post({uri, data}) {
    return this.client.createRequest(this.prefix + uri)
      .asPost()
      .withContent(data)
      .send();
  }
}

export default BrowserHttpClient;
