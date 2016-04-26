import AbstractBusiness from './abstract-business';
import Entity from '../presentation/entity';
import { QueryOption } from '../presentation/query-option';
export interface EntityDBO {
    __KEY?: string;
    __STAMP?: number;
    __deferred?: {
        uri: string;
        __KEY: string;
    };
    [key: string]: any;
}
declare class EntityBusiness extends AbstractBusiness {
    private entity;
    private dataClass;
    private dataClassBusiness;
    private service;
    constructor({wakJSC, entity, dataClass, dataClassBusiness}: {
        wakJSC: any;
        entity: any;
        dataClass: any;
        dataClassBusiness: any;
    });
    _decorateEntity(): void;
    _addUserDefinedMethods(): void;
    fetch(options?: QueryOption): Promise<Entity>;
    callMethod(methodName: string, parameters: any[]): Promise<any>;
    delete(): Promise<void>;
    save(): Promise<Entity>;
    recompute(): Promise<Entity>;
    private prepareDataForSave();
    _refreshEntity({fresherEntity}: {
        fresherEntity: Entity;
    }): void;
    _getExpandString(): string;
}
export default EntityBusiness;
