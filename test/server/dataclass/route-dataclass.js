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
  router.get('/Employee', function (req, res) {
    var collection;
    if (req.query.$filter === '"ID > 0"') {
      collection = require('./query/id-sup-0.json');
      res.json(collection);
    }
    else if (req.query.$limit === '10') {
      collection = require('./query/limit-10.json');
      res.json(collection);
    }
    else if(req.query.$filter === '"firstName = :1"' && req.query.$params === '\'["ARON"]\'') {
      collection = require('./query/firstname-aron.json');
      res.json(collection);
    }
    else {
      collection = require('./query/id-sup-0.json');
      res.json(collection);
      // res.json(req.query);
    }
  });
};
