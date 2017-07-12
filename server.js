var express = require('express');
var engine  = require('ejs-locals');
var app     = express();

var api     = require('./api');
var db      = require('./util/dbmanage');
var cats    = require('./util/categories');
var info    = require('./siteinfo');

//Housekeeping stuff
app.engine('ejs', engine);
app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
app.set('view options', { layout:'views/layouts/layout.ejs' });


app.use('/public', express.static('public'));

process.on('uncaughtException', function (err) {
  console.log("Error: " + err);
});

//Express routing

app.use('/api', api);

app.get('/', function (req, res) {
    db.getTotalCount(function(count){
        res.render('pages/home', {
            "siteName":info.name,
            "parents":cats.getAll(),
            "title": '',
            "total":count
        });
    });
  
});

app.get('/about', function (req, res) {
    db.getTotalCount(function(count){
        var title = "About";
        res.render('pages/about', {
            "siteName":info.name,
            "parents":cats.getAll(),
            "title": title,
            "total":count
        });
    });
});

app.get('/vote', function (req, res) {
  var title = "Vote";
  res.render('pages/vote', {
    "siteName":info.name,
    "votePageHtml":info.votePageHtml,
    "parents":cats.getAll(),
    "title": title
  });
});

app.get('/:parent/:option', function(req, res){
    if (cats.checkCategories(req.params.parent, req.params.option)){
        var catInfo = cats.getCategoryInfo(req.params.parent, req.params.option);

        switch (catInfo.display){
            case "winner":
            case "list":
            case "graph":
                var title = catInfo.name + " Results";
                res.render('pages/'+catInfo.display, {
                    "siteName":info.name,
                    "parents":cats.getAll(),
                    "title": title,
                    "option":req.params.option,
                    "parent":req.params.parent,
                    "optTitle":catInfo.name,
                    "optDesc":catInfo.desc || ''
                });
                break;
            default:
                var title = "Error 500 - Internal Server Error";
                res.status(500).render('pages/stdpage', {
                    "siteName":info.name,
                    "parents":cats.getAll(),
                    "title": title,
                    "content":"Please check the category display property."
                });
                break;
        }
        
    } else {
        var title = "Error 400 - Bad Request";
        res.status(400).render('pages/stdpage', {
            "siteName":info.name,
            "parents":cats.getAll(),
            "title": title,
            "content":"Please check the URL for a valid HOF results option."
        }); 
    }
});

//Start server
var server = app.listen(process.env.PORT || 8080, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Hall of Fame listening at http://%s:%s", host, port)
});
