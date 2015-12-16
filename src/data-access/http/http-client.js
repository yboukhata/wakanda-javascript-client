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

  post({uri, data}) {
    return this.client.createRequest(this.prefix + uri)
      .asPost()
      .withContent(data)
      .send();
  }
}

export default HttpClient;
