import HttpClient from '../../http/http-client';
import { QueryOption } from '../../../presentation/query-option';
import { EntityDBO } from '../../../business/entity-business';
import { CollectionDBO } from '../../../business/collection-business';
export interface IFindParams {
    httpClient: HttpClient;
    key: number | string;
    options: QueryOption;
    dataClassName: string;
}
export interface IQueryParams {
    httpClient: HttpClient;
    options: QueryOption;
    dataClassName: string;
}
export interface ICallMethodParams {
    httpClient: HttpClient;
    methodName: string;
    parameters: any[];
    dataClassName: string;
}
export declare class DataClassBaseService {
    static find({httpClient, key, options, dataClassName}: IFindParams): Promise<EntityDBO>;
    static query({httpClient, options, dataClassName}: IQueryParams): Promise<CollectionDBO>;
    static callMethod({httpClient, methodName, parameters, dataClassName}: ICallMethodParams): Promise<any>;
}
