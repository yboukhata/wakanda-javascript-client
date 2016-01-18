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

  _buildUri() {
    return '/' + this.dataClassName + '(' + this.entity._key + ')'
     + '/' + this.attributeName;
  }
}

export default MediaService;
