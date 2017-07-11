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


app.get('/:parent/:option', function(req, res){
    if (cats.checkCategories(req.params.parent, req.params.option)){
        var catInfo = cats.getCategoryInfo(req.params.parent, req.params.option);
        
        var title = catInfo.name + " Results";
        var page;

        switch (catInfo.display){
            case "winner":
                page = 'pages/results';
                break;
            case "list":
                page = 'pages/resultslist';
                break;
            case "graph":
                page = 'pages/demo';
                break;
            default:
                break;
        }
        res.render(page, {
            "title": title,
            "option":req.params.option,
            "optTitle":catInfo.name,
            "optDesc":catInfo.desc || ''
        });
        
    } else {
        var title = "Error 400 - Bad Request";
        res.status(400).render('pages/stdpage', {
            "title": title,
            "content":"Please check the URL for a valid HOF results option."
        }); 
    }
});


// app.get('/results/:option', function (req, res) {
//     if (hofOptionTitles.hasOwnProperty(req.params.option)){
//         var title = "Results";
//         res.render(((req.params.option != 'remarks')&&(req.params.option != 'mentions')&&(req.params.option != 'moment'))?'pages/results':'pages/resultslist', {
//             "title": title,
//             "option":req.params.option,
//             "optTitle":hofOptionTitles[req.params.option].title,
//             "optDesc":hofOptionTitles[req.params.option].desc
//         });
//     }
//     else{
//        var title = "Error 400 - Bad Request";
//         res.status(400).render('pages/stdpage', {
//             "title": title,
//             "content":"Please check the URL for a valid HOF results option."
//         }); 
//     }
// });


// app.get('/demo/:option', function (req, res) {
//     if (demoOptionTitles.hasOwnProperty(req.params.option)){
//         var title = "Demographics";
//         res.render('pages/demo', {
//             "title": title,
//             "option":req.params.option,
//             "optTitle":demoOptionTitles[req.params.option]
//         });
//     }
//     else{
//         var title = "Error 400 - Bad Request";
//         res.status(400).render('pages/stdpage', {
//             "title": title,
//             "content":"Please check the URL for a valid demographics option."
//         });
//     }
// });

//Start server
var server = app.listen(process.env.PORT || 8080, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Hall of Fame listening at http://%s:%s", host, port)
});
