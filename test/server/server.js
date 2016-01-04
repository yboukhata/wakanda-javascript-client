var express = require('express');
var app = express();
var router = express.Router();
var chalk = require('chalk');

require('./catalog/route-catalog')(router);
require('./dataclass/route-dataclass')(router);

app.use('/rest', router);

app.listen(3030, function () {
  console.log(chalk.yellow('Test server listening on port 3030'));
});
