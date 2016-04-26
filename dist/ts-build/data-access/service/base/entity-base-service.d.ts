import HttpClient from '../../http/http-client';
import { EntityDBO } from '../../../business/entity-business';
export interface ISaveParams {
    httpClient: HttpClient;
    data: EntityDBO;
    expand: string;
    dataClassName: string;
}
export interface IRecomputeParams {
    httpClient: HttpClient;
    data: EntityDBO;
    dataClassName: string;
}
export interface ICallMethodParams {
    httpClient: HttpClient;
    dataClassName: string;
    methodName: string;
    parameters: any[];
    entityKey: string;
}
export interface IDeleteParams {
    httpClient: HttpClient;
    dataClassName: string;
    entityKey: string;
}
export declare class EntityBaseService {
    static save({httpClient, data, expand, dataClassName}: ISaveParams): Promise<EntityDBO>;
    static recompute({httpClient, dataClassName, data}: IRecomputeParams): Promise<EntityDBO>;
    static callMethod({httpClient, dataClassName, methodName, parameters, entityKey}: ICallMethodParams): Promise<any>;
    static delete({httpClient, dataClassName, entityKey}: IDeleteParams): Promise<boolean>;
}
