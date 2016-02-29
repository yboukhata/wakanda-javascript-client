class HttpResponse {
  
  public statusCode: number;
  public headers: any[];
  public body: string;
  
  constructor({statusCode, headers, body}) {
    this.statusCode = statusCode;
    this.headers = headers || [];
    this.body = body;
  }
}

export default HttpResponse;
