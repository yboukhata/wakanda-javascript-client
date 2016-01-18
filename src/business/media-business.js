import AbstractBusiness from './abstract-business';
import MediaService from '../data-access/service/media-service';

class MediaBusiness extends AbstractBusiness {
  constructor({wakJSC, media, dataClassBusiness, isImage, attributeName, entity}) {
    super({wakJSC});

    this.media = media;
    this.entity = entity;
    this.dataClassBusiness = dataClassBusiness;
    this.isImage = isImage === true
    this.service = new MediaService({
      wakJSC,
      mediaBusiness: this,
      media,
      attributeName,
      dataClassBusiness
    });
  }

  upload(file, mimeType) {
    return this.service.upload(file, mimeType).then(dbo => {
      return dbo; //FIXME
    }).then(() => {
      //FIXME - crappy, force a refresh of the entity to get proper stamp and media uri
      return this.entity.fetch();
    });
  }

  _decorateMedia() {
    this.media.upload = this.upload.bind(this);
  }
}

export default MediaBusiness;
