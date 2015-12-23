module.exports = function(router) {
  router.get('/Employee\\(:id\\)', function (req, res) {
    if (req.params.id === '10') {
      var employee;
      if (req.query.$expand === 'employer') {
        employee = require('./find/find-expanded.json');
      }
      else if(req.query.$expand === 'employer,employer.staff') {
        employee = require('./find/find-nested-expanded.json');
      }
      else {
        employee = require('./find/find.json');
      }
      res.json(employee);
    }
    else if (req.params.id === '404') {
      res.status(404).json({});
    }
    else {
      res.status(400).json({});
    }
  });
};
