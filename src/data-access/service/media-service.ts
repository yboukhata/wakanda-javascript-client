import {Promise} from 'es6-promise';

import AbstractService from './abstract-service';
import Entity from '../../presentation/entity';
import Media from '../../presentation/media';
import HttpResponse from '../http/http-response';
import {EntityDBO} from '../../business/entity-business';

class MediaService extends AbstractService {
  
  private dataClassName: string;
  private entity: Entity;
  private isImage: boolean;
  private media: Media;
  private attributeName: string;
  
  constructor({wakJSC, mediaBusiness, media, attributeName, dataClassBusiness}) {
    super({wakJSC});

    this.dataClassName = dataClassBusiness.dataClass.name;
    this.entity = mediaBusiness.entity;
    this.isImage = mediaBusiness.isImage;
    this.media = media;
    this.attributeName = attributeName;
  }

  upload(file: any, mimeType: string): Promise<HttpResponse> {

    var uri = this._buildUri();

    if (this.isImage) {
      uri += '?$rawPict=' + mimeType;
    }

    //FIXME - real crappy not to return some piece of information to refresh entity
    return this.httpClient.post({
      uri,
      data: file,
      binary: true
    });
  }

  delete(): Promise<HttpResponse> {
    var uri = '/' + this.dataClassName + '(' + this.entity._key + ')';
    var data: EntityDBO = {
      __KEY: this.entity._key,
      __STAMP: this.entity._stamp
    };

    data[this.attributeName] = null;

    //FIXME - crappy
    return this.httpClient.post({
      uri,
      data
    });
  }

  _buildUri(): string {
    return '/' + this.dataClassName + '(' + this.entity._key + ')'
     + '/' + this.attributeName;
  }
}

export default MediaService;
