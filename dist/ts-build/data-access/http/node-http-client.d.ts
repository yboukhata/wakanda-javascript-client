/// <reference path="../../../src/data-access/http/request.d.ts" />
import { HttpClient, GetRequestOption, PostRequestOption } from './http-client';
import HttpResponse from './http-response';
declare class NodeHttpClient extends HttpClient {
    private request;
    private cookieJar;
    constructor({apiPrefix}: {
        apiPrefix: any;
    });
    _clearCookie(): void;
    get({uri, params}: GetRequestOption): Promise<HttpResponse>;
    _getWithoutInterceptor({uri, params}: GetRequestOption): Promise<HttpResponse>;
    post({uri, data, binary}: PostRequestOption): Promise<HttpResponse>;
    _httpResponseAdaptor({requestOptions}: {
        requestOptions: any;
    }): Promise<HttpResponse>;
}
export default NodeHttpClient;
