module.exports = function (router) {

  router.get('/\\$catalog/:dc', function (req, res) {
    var dc = req.params.dc;
    if (dc === '$all') {
      var allCatalog = require('./all.json');
      res.json(allCatalog);
    }
    else if (dc === 'Employee,Company') {
      var partialCatalog = require('./employee-company.json');
      res.json(partialCatalog);
    }
    else if(dc === 'Toto') {
      var notFound = require('./notfound.json');
      res.status(404).json(notFound);
    }
    else {
      res.status(400).json({});
    }
  });
};
