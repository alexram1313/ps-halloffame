var express = require('express');
var engine  = require('ejs-locals');
var app     = express();

var api     = require('./api');
var db      = require('./util/dbmanage');

app.engine('ejs', engine);
app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
app.set('view options', { layout:'views/layouts/layout.ejs' });


app.use('/public', express.static('public'));

process.on('uncaughtException', function (err) {
  console.log("Error: " + err);
});


app.use('/api', api);

app.get('/', function (req, res) {
  var title = "";
  res.render('pages/home', {
    "title": title,
    "total":db.getTotalCount()
  });
});

app.get('/about', function (req, res) {
  var title = "About";
  res.render('pages/about', {
    "title": title,
    "total":db.getTotalCount()
  });
});

app.get('/vote', function (req, res) {
  var title = "Vote";
  res.render('pages/vote', {
    "title": title
  });
});

app.get('/results/:option', function (req, res) {
  var title = "Results";
  res.render('pages/results', {
    "title": title,
    "option":req.params.option
  });
});


app.get('/demo/:option', function (req, res) {
  var title = "Demographics";
  res.render('pages/demo', {
    "title": title,
    "option":req.params.option
  });
});


var server = app.listen(process.env.PORT || 8080, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Hall of Fame listening at http://%s:%s", host, port)
});
