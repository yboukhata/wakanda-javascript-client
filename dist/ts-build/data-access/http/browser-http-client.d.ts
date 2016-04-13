/// <reference path="../../../src/data-access/http/aurelia-http-client.d.ts" />
import { HttpClient, GetRequestOption, PostRequestOption } from './http-client';
import HttpResponse from './http-response';
declare class BrowserHttpClient extends HttpClient {
    private client;
    constructor({apiPrefix}: {
        apiPrefix: any;
    });
    get({uri, params}: GetRequestOption): Promise<HttpResponse>;
    _getWithoutInterceptor({uri}: GetRequestOption): Promise<HttpResponse>;
    post({uri, data, binary}: PostRequestOption): Promise<HttpResponse>;
    _httpResponseAdaptor({request}: {
        request: any;
    }): Promise<HttpResponse>;
}
export default BrowserHttpClient;
