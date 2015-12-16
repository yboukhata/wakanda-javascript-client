class EntityTransform {
  constructor({rawString}) {
    var obj = JSON.parse(rawString);

    return obj;
  }
}

export default EntityTransform;
