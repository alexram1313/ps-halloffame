var express = require('express');
var engine  = require('ejs-locals');
var app     = express();

var api     = require('./api');
var db      = require('./util/dbmanage');


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
            "total":count()
        });
    });
});

app.get('/vote', function (req, res) {
  var title = "Vote";
  res.render('pages/vote', {
    "title": title
  });
});


//Hardcoded strings :(
const hofOptionTitles = {
    'artist':{title:'Best Artist', desc:'This category recognizes the PonySquare user that also happened to be the best artist.'},
    'css':{title:'Best CSS', desc:'This category recognizes the PonySquare user with the best mix of design and technical knowledge applied to their profile.'},
    'admin':{title:'Best Admin of All-time', desc:'Being an admin of any kind is a tough job. This category recognizes the admin that maintained a positive relationship with the users as well as the values of PonySquare.'},
    'friendliest':{title:'Friendliest User', desc:'This category recognizes the users who went above and beyond to simply be a good friend to others.'},
    'nonpony':{title:'Best Non-pony', desc:'MLP:FiM is full of non-ponies, such as griffons, yaks, etc. This category recognizes those who have added their own unique flare to the animal kingdom of the show.'},
    'techie':{title:'Favorite Techie Friend', desc:'In this day in age, knowledge of computers, programming, technology, etc. can be very handy. This category recognizes the friends who have been effective at sharing and demonstrating their technical ability.'},
    'musician':{title:'Favorite Musician Friend', desc:'Music is part of everyday life. This category recognize those talented artists that can make us jam out.'},
    'page':{title:'Favorite PonySquare Page', desc:'Want to see hot mares or looking for that special somepony? PonySquare pages had you covered for all your roleplaying needs. This category recognizes those pages which have have the PonySquare experience worthwhile.'},
    'forum':{title:'Favorite Forum RP', desc:'This category recognizes those who have wanted an open roleplaying experience. *NOTE: Several respondents have never used or had negative opinions about the forums.'},
    'moment':{title:'Favorite Moments', desc:''},
    'hugger':{title:'Best Hugger', desc:'This category recognizes those users who simply loved to click that hug back link. *NOTE: Many remarked that Snow Sailor is suspected of using an automated hugger.'},
    'oc':{title:'Best OC', desc:'This category recognizes those who have striveds to effectively develop their original character'},
    'roleplayer':{title:'Best Roleplayer', desc:'Roleplaying is the heart of PonySquare and this prestigious title recognizes those who have perfected their story development and creative writing skills throughout the years.'},
    'mentions':{title:'Honorable Mentions', desc:'This category recognizes other notable PonySquare users according to the respondents!'},
    'remarks':{title:"Misc. Remarks", desc:'The following are miscellaneous remarks left on some responses.'}
}

app.get('/results/:option', function (req, res) {
    if (hofOptionTitles.hasOwnProperty(req.params.option)){
        var title = "Results";
        res.render(((req.params.option != 'remarks')&&(req.params.option != 'mentions')&&(req.params.option != 'moment'))?'pages/results':'pages/resultslist', {
            "title": title,
            "option":req.params.option,
            "optTitle":hofOptionTitles[req.params.option].title,
            "optDesc":hofOptionTitles[req.params.option].desc
        });
    }
    else{
       var title = "Error 400 - Bad Request";
        res.status(400).render('pages/stdpage', {
            "title": title,
            "content":"Please check the URL for a valid HOF results option."
        }); 
    }
});

const demoOptionTitles = {
    'country' :'Country',
    'subpol'  :'Subpolitical Division (State/Province/County/etc)',
    'gender'  :'Gender',
    'nextsite':'Site after PonySquare'
}

app.get('/demo/:option', function (req, res) {
    if (demoOptionTitles.hasOwnProperty(req.params.option)){
        var title = "Demographics";
        res.render('pages/demo', {
            "title": title,
            "option":req.params.option,
            "optTitle":demoOptionTitles[req.params.option]
        });
    }
    else{
        var title = "Error 400 - Bad Request";
        res.status(400).render('pages/stdpage', {
            "title": title,
            "content":"Please check the URL for a valid demographics option."
        });
    }
});

//Start server
var server = app.listen(process.env.PORT || 8080, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Hall of Fame listening at http://%s:%s", host, port)
});
