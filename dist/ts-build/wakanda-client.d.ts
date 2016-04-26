import HttpClient from './data-access/http/http-client';
import Catalog from './presentation/catalog';
import BrowserHttpClient from './data-access/http/browser-http-client';
import NodeHttpClient from './data-access/http/node-http-client';
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
