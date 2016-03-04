import AbstractBusiness from './abstract-business';
import MediaService from '../data-access/service/media-service';
import Media from '../presentation/media';
import Entity from '../presentation/entity';
import DataClassBusiness from './dataclass-business';

class MediaBusiness extends AbstractBusiness {
    
  private media: Media;
  private entity: Entity;
  private dataClassBusiness: DataClassBusiness;
  private isImage: boolean;
  private service: MediaService;
  
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

  _decorateMedia() {
    this.media.upload = this.upload.bind(this);
    this.media.delete = this.delete.bind(this);
  }

  upload(file: any, mimeType?: string): Promise<Entity> {

    if (!this.entity._key) {
      throw new Error('Media.upload: entity must be saved before uploading a media');
    }

    return this.service.upload(file, mimeType).then(dbo => {
      return dbo; //FIXME
    }).then(() => {
      //FIXME - crappy, force a refresh of the entity to get proper stamp and media uri
      return this.entity.fetch();
    });
  }

  delete(): Promise<Entity> {

    if (!this.entity._key) {
      throw new Error('Media.upload: entity must be saved before deleting a media');
    }

    return this.service.delete().then(() => {
      //FIXME - crappy, force a refresh of the entity to get proper stamp and media uri
      return this.entity.fetch();
    });
  }
}

export default MediaBusiness;
