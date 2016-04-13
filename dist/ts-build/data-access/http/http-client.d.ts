import HttpResponse from './http-response';
export interface RequestOption {
    uri: string;
}
export interface GetRequestOption extends RequestOption {
    params?: any;
}
export interface PostRequestOption extends RequestOption {
    data?: any;
    binary?: boolean;
}
export declare type RequestInterceptor<T extends RequestOption> = (options: T) => any;
export declare type ResponseInterceptor = (requestUri: string, promise: Promise<HttpResponse>) => Promise<HttpResponse>;
export declare abstract class HttpClient {
    prefix: string;
    private _getRequestInterceptors;
    private _postRequestInterceptors;
    private _getResponseInterceptors;
    private _postResponseInterceptors;
    constructor({apiPrefix}: {
        apiPrefix: string;
    });
    get(options: GetRequestOption): Promise<HttpResponse>;
    post(options: PostRequestOption): Promise<HttpResponse>;
    /**
     * @return {Promise} Returns either the underlying HTTP request result, or the promise returned by the interceptor if any
     */
    protected responseGet(requestUri: string, promise: Promise<HttpResponse>): Promise<HttpResponse>;
    /**
     * @return {Promise} Returns either the underlying HTTP request result, or the promise returned by the interceptor if any
     */
    protected responsePost(requestUri: string, promise: Promise<HttpResponse>): Promise<HttpResponse>;
    /**
     * @param {array|string} type - HTTP verb of the request to intercept
     * @param {function} callback - The interceptor function to execute before HTTP request. If it returns something different than null, the underlying HTTP request won't be executed
     * @returns {null|object} Returns null or an object, if an object is returned, the underlying HTTP request won't be executed
     */
    registerRequestInterceptor(type: string | string[], callback: RequestInterceptor<RequestOption>): void;
    registerResponseInterceptor(type: string | string[], callback: ResponseInterceptor): void;
    private _interceptorTypeToArray(type);
    private _isValidInterceptorType(type);
}
export default HttpClient;
