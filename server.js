var express = require('express');
var engine  = require('ejs-locals');
var app     = express();

var api     = require('./api');
var db      = require('./util/dbmanage');
var cats    = require('./util/categories')


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
        var title = "";
        res.render('pages/home', {
            "title": title,
            "total":count
        });
    });
  
});

app.get('/about', function (req, res) {
    db.getTotalCount(function(count){
        var title = "About";
        res.render('pages/about', {
            "title": title,
            "total":count
        });
    });
});

app.get('/vote', function (req, res) {
  var title = "Vote";
  res.render('pages/vote', {
    "title": title
  });
});

const pageTypes = ['winner', 'list', 'graph'];

app.get('/:parent/:option', function(req, res){
    if (cats.checkCategories(req.params.parent, req.params.option)){
        var catInfo = cats.getCategoryInfo(req.params.parent, req.params.option);
        
        var title = catInfo.name + " Results";
        var page;

        if (pageTypes.indexOf(catInfo.display) != -1){
            res.render('pages/'+catInfo.display, {
                "title": title,
                "option":req.params.option,
                "optTitle":catInfo.name,
                "optDesc":catInfo.desc || ''
            });
        }else{
            var title = "Error 500 - Internal Server Error";
            res.status(500).render('pages/stdpage', {
                "title": title,
                "content":"Please check the category display property."
            });
        }
        
        
    } else {
        var title = "Error 400 - Bad Request";
        res.status(400).render('pages/stdpage', {
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
