import HttpClient from './http-client';
import {HttpClient as AureliaHttpClient} from 'aurelia-http-client';
import HttpResponse from './http-response';

class BrowserHttpClient extends HttpClient {

  constructor({apiPrefix}) {
    super({apiPrefix});
    this.client = new AureliaHttpClient();
  }

  get({uri}) {
      let request = this.client.createRequest(this.prefix + uri)
        .asGet()
        .send();

      return this._httpResponseAdaptor({request});
  }

  post({uri, data}) {
    let request = this.client.createRequest(this.prefix + uri)
      .asPost()
      .withContent(data)
      .send();

      return this._httpResponseAdaptor({request});
  }

  _httpResponseAdaptor({request}) {
    return new Promise((resolve, reject) => {
      request
        .then(res => {
          resolve(new HttpResponse({
            statusCode: 0,
            headers: [],
            body: res.response
          }));
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}

export default BrowserHttpClient;
