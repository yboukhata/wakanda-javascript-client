import HttpClient from '../../http/http-client';
import { QueryOption } from '../../../presentation/query-option';
import { CollectionDBO } from '../../../business/collection-business';
export interface IBaseParams {
    httpClient: HttpClient;
    collectionUri: string;
    isEntitySet: boolean;
}
export interface IFetchParams extends IBaseParams {
    options: QueryOption;
}
export interface ICallMethod extends IBaseParams {
    methodName: string;
    parameters: any[];
}
export declare class CollectionBaseService {
    static fetch({httpClient, collectionUri, isEntitySet, options}: IFetchParams): Promise<CollectionDBO>;
    static callMethod({httpClient, collectionUri, isEntitySet, methodName, parameters}: {
        httpClient: any;
        collectionUri: any;
        isEntitySet: any;
        methodName: any;
        parameters: any;
    }): any;
    private static _removeRestFromUri(uri);
}
export declare function isEntitySetUri(uri: string): boolean;
