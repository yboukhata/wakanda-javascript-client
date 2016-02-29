/// <reference path="./request.d.ts" />

import {Promise} from 'es6-promise';
import request = require('request');

import {HttpClient, GetRequestOption, PostRequestOption} from './http-client';
import HttpResponse from './http-response';

class NodeHttpClient extends HttpClient {

  private request: any;
  private cookieJar: any;

  constructor({apiPrefix}) {
    super({apiPrefix});
    
    this.request = request;
    this.cookieJar = this.request.jar();
  }

  _clearCookie(): void {
    this.cookieJar = this.request.jar();
  }

  get({uri, params}: GetRequestOption): Promise<HttpResponse> {
    try {
      let res = super.get({uri, params});
      if (res !== null) {
        return Promise.resolve(res);
      }
    }
    catch (e) {
      return Promise.reject(e);
    }

    let result = this._getWithoutInterceptor({uri, params});
    return super.responseGet(uri, result);
  }

  _getWithoutInterceptor({uri, params}: GetRequestOption): Promise<HttpResponse> {
    let options = {
      url: this.prefix + uri,
      method: 'GET',
      qs: params,
      jar: this.cookieJar
    };

    return this._httpResponseAdaptor({requestOptions: options});
  }

  post({uri, data, binary}: PostRequestOption): Promise<HttpResponse> {
    try {
      let res = super.post({uri, data, binary});
      if (res !== null) {
        return Promise.resolve(res);
      }
    }
    catch (e) {
      return Promise.reject(e);
    }

    let options: any = {
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

    let result = this._httpResponseAdaptor({requestOptions: options});
    return super.responsePost(uri, result);
  }

  _httpResponseAdaptor({requestOptions}): Promise<HttpResponse> {
    return new Promise((resolve, reject) => {
      this.request(requestOptions, (error: any, response: any, body: string) => {
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
