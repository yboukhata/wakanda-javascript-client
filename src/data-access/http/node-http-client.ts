import HttpClient from './http-client';
import HttpResponse from './http-response';

class NodeHttpClient extends HttpClient {

  constructor({apiPrefix}) {
    super({apiPrefix});
    this.request = require('request');
    this.cookieJar = this.request.jar();
  }

  _clearCookie() {
    this.cookieJar = this.request.jar();
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

    return this._getWithoutInterceptor({uri, params});
  }

  _getWithoutInterceptor({uri, params}) {
    let options = {
      url: this.prefix + uri,
      method: 'GET',
      qs: params,
      jar: this.cookieJar
    };

    return this._httpResponseAdaptor({requestOptions: options});
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

    let options = {
      url: this.prefix + uri,
      method: 'POST',
      form: data,
      jar: this.cookieJar
    };

    try {
      if (!binary) {
        options.headers = {
          'Content-Type': 'application/json'
        };
        options.form = JSON.stringify(data);
      }
    }
    catch(e) {
      return Promise.reject(e);
    }

    return this._httpResponseAdaptor({requestOptions: options});
  }

  _httpResponseAdaptor({requestOptions}) {
    return new Promise((resolve, reject) => {
      this.request(requestOptions, (error, response, body) => {
        if (error || response.statusCode >= 400) {
          reject(error || {statusMessage: response.statusMessage, body: body});
        }
        else {
          resolve(new HttpResponse({
            statusCode: response.statusCode,
            headers: [],
            body
          }));
        }
      });
    });
  }
}

export default NodeHttpClient;
