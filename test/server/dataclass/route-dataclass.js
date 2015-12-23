module.exports = function(router) {
  router.get('/Employee\\(:id\\)', function (req, res) {
    if (req.params.id === '10') {
      var employee = require('./find/find.json');
      res.json(employee);
    }
    else {
      res.status(400).json({});
    }
  });
};
