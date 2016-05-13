import { HttpClient, IGetRequestOption, IPostRequestOption } from './http-client';
import HttpResponse from './http-response';
declare class NodeHttpClient extends HttpClient {
    private request;
    private cookieJar;
    constructor({apiPrefix}: {
        apiPrefix: string;
    });
    _clearCookie(): void;
    get({uri, params}: IGetRequestOption): Promise<HttpResponse>;
    _getWithoutInterceptor({uri, params}: IGetRequestOption): Promise<HttpResponse>;
    post({uri, data, binary}: IPostRequestOption): Promise<HttpResponse>;
    _httpResponseAdaptor({requestOptions}: {
        requestOptions: any;
    }): Promise<HttpResponse>;
}
export default NodeHttpClient;
