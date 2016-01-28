import HttpClient from './http-client';
import {HttpClient as AureliaHttpClient} from 'aurelia-http-client';
import HttpResponse from './http-response';

class BrowserHttpClient extends HttpClient {

  constructor({apiPrefix}) {
    super({apiPrefix});
    this.client = new AureliaHttpClient();
  }

  get({uri, params}) {
    try {
      let res = super.get({uri, params});
      if (res !== null) {
        return Promise.resolve(res);
      }
    }
    catch (e) {
      return Promise.reject(e);
    }

    let request = this.client.createRequest(this.prefix + uri)
      .asGet()
      .send();

    return this._httpResponseAdaptor({request});
  }

  post({uri, data, binary}) {
    try {
      let res = super.post({uri, data, binary});
      if (res !== null) {
        return Promise.resolve(res);
      }
    }
    catch (e) {
      return Promise.reject(e);
    }

    let request = this.client.createRequest(this.prefix + uri)
      .asPost()
      .withContent(data)
      .send();

    return this._httpResponseAdaptor({request});
  }

  _httpResponseAdaptor({request}) {
    return request.then(res => {
      return new HttpResponse({
        statusCode: res.statusCode,
        headers: [],
        body: res.response
      });
    });
  }
}

export default BrowserHttpClient;
