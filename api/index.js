var app = require('express');
var bodyParser = require('body-parser')
const router = app.Router({ mergeParams: true });

router.use( bodyParser.json() );       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

var db = require('../util/dbmanage')

//These are the only valid categories for results retrieval.
const validCategories = ['artist','css','admin','friendliest','nonpony','techie',
                        'musician','page','forum','moment','hugger','oc','roleplayer',
                        'mentions','country', 'subpol', 'gender','nextsite','remarks'];

router.get("/results/:category", function(req, res){
    //Check if category is a valid one
    if (validCategories.indexOf(req.params.category) != -1){
        db.retrieveData(function(err, data){
            if (!err){
                //Construct key-value pairs of HOF Nominee and Number of votes
                var results = {};
                for (var key in data) {
                    if (data[key].hasOwnProperty(req.params.category)) {
                        var index = data[key][req.params.category];
                        results[index] = results[index]+1 || 1;
                    }
                }
                res.status(200).json({results:results});
            }
            else{
                res.status(500).json({message:err});
                console.log(err);
            }
        });
    } else {
        res.status(400).json({message:"Invalid category"});
    }
});

router.post("/votes", function(req, res){
    var requestIP = req.connection.remoteAddress;
    var entry     = req.body.entry;

    //We must check the IP address first (it's done in db.enterData)
    //Then if a new IP address is used, count the vote and send 200.
    //Otherwise, send 400.
    db.enterData(requestIP,entry, function(success, err){
        if (success){
            res.status(200).json({message: "success"});
        } else {
            res.status(400).json({message: err});
        }
    });
});

//Landing...because why not?
router.get('/', function(req, res){
    res.status(200).json({message:'Connected to Hall of Fame API!'});
});


module.exports = router;