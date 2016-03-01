declare module 'aurelia-http-client' {  
  export class HttpClient {
    createRequest(uri: string): RequestBuilder;
  }
  
  export class RequestBuilder {
    asGet(): RequestBuilder;
    asPost(): RequestBuilder;
    withContent(data: any): RequestBuilder;
    send(): any;
  }
}