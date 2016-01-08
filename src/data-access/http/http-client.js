class HttpClient {

  constructor({apiPrefix}) {
    this.prefix = apiPrefix;
  }

  get() {
    throw new Error('HttpClient.get: Must be implemented');
  }

  post() {
    throw new Error('HttpClient.post: Must be implemented');
  }
}

export default HttpClient;
