module.exports = function (router) {

  router.get('/\\$catalog/:dc', function (req, res) {
    var dc = req.params.dc;
    if (dc === '$all') {
      var allCatalog = require('./all.json');
      res.json(allCatalog);
    }
  });
};
