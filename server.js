var express = require('express');
var app     = express();



var server = app.listen(process.env.PORT || 8081, function () {
  var host = server.address().address
  var port = server.address().port

  console.log("API listening at http://%s:%s", host, port)
});
