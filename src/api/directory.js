class Directory {
  constructor({httpClient}) {
    this.httpClient = httpClient;
  }

  login(username, password) {
    return this.httpClient.post({
      uri:'/$directory/login',
      data: [username, password]
    })
      .then(_ => {
        return true;
      })
      .catch(_ => {
        throw new Error('Unauthorized');
      });
  }
}

export default Directory;
