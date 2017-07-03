var express = require('express');
var engine = require('ejs-locals');
var app     = express();

var api     = require('./api');

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
  var content = "<p>Instructions to come.</p>";
  res.render('pages/stdpage', {
    "title": title,
    "content": content
  });
});


var server = app.listen(process.env.PORT || 8080, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Hall of Fame listening at http://%s:%s", host, port)
});
