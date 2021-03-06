var app = require('express');
var bodyParser = require('body-parser')
var fs = require('fs');
const router = app.Router({ mergeParams: true });
var db = require('../util/dbmanage');
var categories = require('../util/categories');

router.use( bodyParser.json() );       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

router.get("/:parent/:category", function(req, res){
    //Check if category is a valid one
    if (categories.checkCategories(req.params.parent, req.params.category)){
        db.retrieveData(function(err, data){
            if (!err){
                //Construct key-value pairs of HOF Nominee and Number of votes
                var results = {};
                for (var obj of data) {
                    if (obj.get('votes.'+req.params.category)) {
                            var index = obj.votes[req.params.category];
                            results[index] = results[index]+1 || 1;
                    }
                }
                res.status(200).json({results:results});
                /*
                    Results Structure
                    {
                        "results":{
                            "nominee1":count1,
                            "nominee2":count2,
                            "nominee3":count3,
                            ...,
                            "nomineeN":countN
                        }
                    }
                */
            }
            else{
                res.status(500).json({err:err});
                console.log(err);
            }
        });
    } else {
        res.status(400).json({err:"Invalid category"});
    }
});

router.post("/votes", function(req, res){
    var requestIP = req.connection.remoteAddress;
    var entry     = req.body.entry;

    //Check if it's obvious someone is voting for themselves.
    //Algorithm goes here: Difference between length of values and unique values >= threshold
    const values = Object.keys(entry).map(function(key){
        return entry[key];
    });
    const threshold = 5;
    var uniqueValues = new Set(values);

    if (values.length - uniqueValues.size >= threshold){
        res.status(400).json({err: "Voting for self"});
        return;
    }
    

    //We must check the IP address first (it's done in db.enterData)
    //Then if a new IP address is used, count the vote and send 200.
    //Otherwise, send 400.
    db.enterData(requestIP, entry, function(success, err){
        if (success){
            res.status(200).json({message: "success"});
        } else {
            res.status(400).json({err: err});
        }
    });
});

//Speech retrieval
//Speech data won't change much so let's just read it from
//a JSON file.
router.get('/speeches/:page/:category', function(req, res){
    fs.readFile('./speeches.json', function(err, data){
        if (err){
            res.status(500).json({err:err});
        }
        
        var result = {speeches:[]};
        var speeches = JSON.parse(data);
        if (speeches.hasOwnProperty(req.params.page) &&
            speeches[req.params.page].hasOwnProperty(req.params.category)){
            var catSpeeches = speeches[req.params.page][req.params.category];
            for (var user in catSpeeches){
                if (catSpeeches.hasOwnProperty(user)){
                    result.speeches.push({
                        user:user,
                        speech:catSpeeches[user]
                    });
                }
            }
        }
        res.status(200).json(result);
    });
});

//Landing...because why not?
router.get('/', function(req, res){
    res.status(200).json({message:'Connected to Hall of Fame API!'});
});


module.exports = router;