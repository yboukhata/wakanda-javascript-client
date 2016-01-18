import AbstractBusiness from './abstract-business';

class MediaBusiness extends AbstractBusiness {
  constructor({wakJSC, media, dataClassBusiness}) {
    super({wakJSC});

    this.media = media;
    this.dataClassBusiness = dataClassBusiness;
  }

  _decorateMedia() {

  }
}

export default MediaBusiness;
