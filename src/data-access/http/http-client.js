import {HttpClient as AureliaHttpClient} from 'aurelia-http-client';

class HttpClient {

  constructor({apiPrefix}) {
    this.client = new AureliaHttpClient();
    this.prefix = apiPrefix;
  }

  get({uri}) {
    return this.client.createRequest(this.prefix + uri)
      .asGet()
      .send();
  }
}

export default HttpClient;
