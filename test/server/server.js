var express = require('express');
var app = express();
var router = express.Router();

require('./catalog/route-catalog')(router);



app.use('/rest', router);

app.listen(3030, function () {
  console.log('Test server listening on port 3030');
});
