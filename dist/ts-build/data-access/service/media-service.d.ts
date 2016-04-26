import AbstractService from './abstract-service';
import HttpResponse from '../http/http-response';
declare class MediaService extends AbstractService {
    private dataClassName;
    private entity;
    private isImage;
    private media;
    private attributeName;
    constructor({wakJSC, mediaBusiness, media, attributeName, dataClassBusiness}: {
        wakJSC: any;
        mediaBusiness: any;
        media: any;
        attributeName: any;
        dataClassBusiness: any;
    });
    upload(file: any, mimeType: string): Promise<HttpResponse>;
    delete(): Promise<HttpResponse>;
}
export default MediaService;
