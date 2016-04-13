import AbstractService from './abstract-service';
import { EntityDBO } from '../../business/entity-business';
declare class EntityService extends AbstractService {
    private entity;
    private dataClass;
    constructor({wakJSC, entity, dataClass}: {
        wakJSC: any;
        entity: any;
        dataClass: any;
    });
    save(data: EntityDBO, expand: string): Promise<EntityDBO>;
    recompute(data: EntityDBO): Promise<EntityDBO>;
    callMethod(methodName: string, parameters: any[]): Promise<any>;
    delete(): Promise<boolean>;
}
export default EntityService;
