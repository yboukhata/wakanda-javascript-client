class Directory {
  constructor({httpClient}) {
    this.httpClient = httpClient;
  }

  login(username, password) {
    return this.httpClient.post({
      uri:'/$directory/login',
      data: [username, password]
    })
      .then(res => {
        return true;
      })
      .catch(err => {
        console.error('Directory.login error', err);
        throw err;
      });
  }
}

export default Directory;
