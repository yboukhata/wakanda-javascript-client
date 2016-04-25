import {HttpClient, GetRequestOption, PostRequestOption} from './http-client';
import HttpResponse from './http-response';

const AureliaHttpClient: any = require('aurelia-http-client').HttpClient;

class BrowserHttpClient extends HttpClient {

  private client: any;

  constructor({apiPrefix}) {
    super({apiPrefix});
    this.client = new AureliaHttpClient();
  }

  get({uri, params}: GetRequestOption): Promise<HttpResponse> {
    try {
      let res = super.get({uri, params});
      if (res !== null) {
        return Promise.resolve(res);
      }
    }
    catch (e) {
      return <any>Promise.reject(e);
    }

    let result = this._getWithoutInterceptor({uri, params});
    return super.responseGet(uri, result);
  }

  _getWithoutInterceptor({uri}: GetRequestOption): Promise<HttpResponse> {
    let request = this.client.createRequest(this.prefix + uri)
      .asGet()
      .send();

    return this._httpResponseAdaptor({request});
  }

  post({uri, data, binary}: PostRequestOption): Promise<HttpResponse> {
    try {
      let res = super.post({uri, data, binary});
      if (res !== null) {
        return Promise.resolve(res);
      }
    }
    catch (e) {
      return <any>Promise.reject(e);
    }

    let request = this.client.createRequest(this.prefix + uri)
      .asPost()
      .withContent(data)
      .send();

    let result = this._httpResponseAdaptor({request});
    return super.responsePost(uri, result);
  }

  _httpResponseAdaptor({request}): Promise<HttpResponse> {
    return request.then((res: any) => {
      return new HttpResponse({
        statusCode: res.statusCode,
        headers: [],
        body: res.response
      });
    });
  }
}

export default BrowserHttpClient;
