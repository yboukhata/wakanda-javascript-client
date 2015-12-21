import HttpClient from './http-client';

class NodeHttpClient extends HttpClient {

  constructor({apiPrefix}) {
    super({apiPrefix});
    this.request = require('request');
  }

  get({uri}) {
    //TODO - response adapter to transform response from node or browser clients
    //to a standardize one (headers, status code, content etc)
  }

  post({uri, data}) {

  }
}
