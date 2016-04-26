import AbstractBusiness from './abstract-business';
import Entity from '../presentation/entity';
declare class MediaBusiness extends AbstractBusiness {
    private media;
    private entity;
    private dataClassBusiness;
    private isImage;
    private service;
    constructor({wakJSC, media, dataClassBusiness, isImage, attributeName, entity}: {
        wakJSC: any;
        media: any;
        dataClassBusiness: any;
        isImage: any;
        attributeName: any;
        entity: any;
    });
    _decorateMedia(): void;
    upload(file: any): Promise<Entity>;
    delete(): Promise<Entity>;
}
export default MediaBusiness;
