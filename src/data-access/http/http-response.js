class HttpResponse {
  constructor({statusCode, headers, body}) {
    this.statusCode = statusCode;
    this.headers = headers || [];
    this.body = body;
  }
}

export default HttpResponse;
