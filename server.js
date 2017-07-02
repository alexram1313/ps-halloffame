var express = require('express');
var app     = express();

var api     = require('./api');


app.use('/api', api);

app.get('/', function(req, res){
    res.status(200).json({message:'Connected to Hall of Fame!'});
});

var server = app.listen(process.env.PORT || 8080, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("API listening at http://%s:%s", host, port)
});
