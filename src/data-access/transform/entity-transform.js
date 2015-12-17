import Entity from '../model/entity';

class EntityTransform {
  constructor({rawString, dataClass, wakJSC}) {
    return new Entity({
      rawObj: JSON.parse(rawString),
      dataClass,
      wakJSC
    });
  }
}

export default EntityTransform;
