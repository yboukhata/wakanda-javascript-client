class Catalog {
  constructor({httpClient}) {
    this.httpClient = httpClient;
  }

  get() {
    return this.httpClient.get({uri: '/$catalog'})
      .then(res => {
        return JSON.parse(res.response);
      })
      .catch(error => {
        console.error('Catalog.get error', error);
      });
  }
}

export default Catalog;
