class HttpClient {

  constructor({apiPrefix}) {
    this.prefix = apiPrefix;
  }

  get({uri}) {
    throw new Error('HttpClient.get: Must be implemented');
  }

  post({uri, data}) {
    throw new Error('HttpClient.post: Must be implemented');
  }
}

export default HttpClient;
