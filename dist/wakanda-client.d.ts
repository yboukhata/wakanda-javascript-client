export interface Directory {
  login(username: string, password: string, duration?: number): Promise<boolean>;
  logout(): Promise<boolean>;
  currentUser(): Promise<any>;
  currentUserBelongsTo(groupName: string): Promise<boolean>;
}

export interface Helper {
  isEntity(object: any): boolean;
  isCollection(object: any): boolean;
}

declare class WakandaClient {
  static HttpClient: typeof BrowserHttpClient | typeof NodeHttpClient;
  _httpClient: HttpClient;
  directory: Directory;
  helper: Helper;
  constructor(host?: string);
  getCatalog(dataClasses?: string[]): Promise<Catalog>;
  version(): string;
}

export default WakandaClient;

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
export type RequestInterceptor<T extends RequestOption> = (options: T) => any;
export type ResponseInterceptor = (requestUri: string, promise: Promise<HttpResponse>) => Promise<HttpResponse>;
declare class HttpClient {
  prefix: string;
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
}

declare class Catalog {
  [key: string]: DataClass;
  constructor({dataClasses}: {
    dataClasses: any;
  });
}

declare class BrowserHttpClient extends HttpClient {
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

declare class NodeHttpClient extends HttpClient {
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

declare class HttpResponse {
  statusCode: number;
  headers: any[];
  body: string;
  constructor({statusCode, headers, body}: {
    statusCode: number;
    headers: any[];
    body: string;
  });
}

export class DataClass {
  name: string;
  collectionName: string;
  attributes: Attribute[];
  methods: {
    entity: string[];
    collection: string[];
    dataClass: string[];
  };
  find: (id: string | number, options?: QueryOption) => Promise<Entity>;
  query: (options?: QueryOption) => Promise<Collection>;
  create: (pojo?: any) => Entity;
  [key: string]: any;
  constructor({name, collectionName, attributes, methods}: {
    name: string;
    collectionName: string;
    attributes: Attribute[];
    methods: {
      entity: string[];
      collection: string[];
      dataClass: string[];
    };
  });
}
export class Attribute {
  name: string;
  type: string;
  readOnly: boolean;
  kind: string;
  constructor({name, type, readOnly, kind}: {
    name: string;
    type: string;
    readOnly?: boolean;
    kind: string;
  });
}
export class AttributeRelated extends Attribute {
}
export class AttributeCollection extends Attribute {
  entityType: string;
  constructor({name, type, readOnly, kind}: {
    name: string;
    type: string;
    readOnly?: boolean;
    kind: string;
  });
}

declare class Entity {
  _key: string;
  _stamp: number;
  _deferred: boolean;
  _dataClass: DataClass;
  [key: string]: any;
  save: () => Promise<Entity>;
  delete: () => Promise<void>;
  fetch: (options?: QueryOption) => Promise<Entity>;
  constructor({key, deferred, dataClass}: {
    key: string;
    deferred: boolean;
    dataClass: DataClass;
  });
}

declare class Collection {
  entities: Entity[];
  _deferred: boolean;
  _count: number;
  _first: number;
  _sent: number;
  _pageSize: number;
  [key: string]: any;
  fetch: (options?: QueryOption) => Promise<Collection>;
  nextPage: () => Promise<Collection>;
  prevPage: () => Promise<Collection>;
  more: () => Promise<Collection>;
  constructor({deferred, dataClass}: {
    deferred: any;
    dataClass: any;
  });
}

declare interface QueryOption {
  select?: string;
  filter?: string;
  params?: string[];
  pageSize?: number;
  start?: number;
  orderBy?: string;
  method?: string;
}
