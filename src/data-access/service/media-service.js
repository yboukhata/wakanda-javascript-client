import AbstractService from './abstract-service';

class MediaService extends AbstractService {
  constructor({wakJSC, mediaBusiness, media, attributeName, dataClassBusiness}) {
    super({wakJSC});

    this.dataClassName = dataClassBusiness.dataClass.name;
    this.entity = mediaBusiness.entity;
    this.isImage = mediaBusiness.isImage;
    this.media = media;
    this.attributeName = attributeName;
  }

  upload(file, mimeType) {

    var uri = this._buildUri();

    if (this.isImage) {
      uri += '?$rawPict=' + mimeType;
    }

    //FIXME - real crappy not to return some piece of information to refresh entity
    return this.httpClient.post({
      uri,
      data: file
    });
  }

  delete() {
    var uri = '/' + this.dataClassName + '(' + this.entity._key + ')';
    var data = {
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

  _buildUri() {
    return '/' + this.dataClassName + '(' + this.entity._key + ')'
     + '/' + this.attributeName;
  }
}

export default MediaService;
