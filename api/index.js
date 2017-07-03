var app = require('express');
var bodyParser = require('body-parser')
const router = app.Router({ mergeParams: true });

router.use( bodyParser.json() );       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

var db = require('../util/dbmanage')


const validCategories = ['artist','css','admin','friendliest','nonpony','techie',
                        'musician','page','forum','moment','hugger','oc','roleplayer',
                        'mentions','country', 'subpol', 'gender','nextsite','remarks'];

router.get("/results/:category", function(req, res){
    if (validCategories.indexOf(req.params.category) != -1){
        db.retrieveData(function(err, data){
            if (!err){
                var results = {};
                for (var key in data) {
                    var index = data[key].trim()
                    if (data.hasOwnProperty(key) && index != '') {
                        results[index] = results[index]+1 || 1;
                    }
                }
                res.status(200).json({results:results});
            }
            else{
                res.status(500).json({message:err});
            }
        });
    } else {
        res.status(400).json({message:"Invalid category"});
    }
});

router.post("/votes", function(req, res){
    var requestIP = req.connection.remoteAddress;
    var entry     = req.body.entry;

    db.enterData(requestIP,entry, function(success, err){
        if (success){
            res.status(200).json({message: "success"});
        } else {
            res.status(400).json({message: err});
        }
    });
});

router.get('/', function(req, res){
    res.status(200).json({message:'Connected to Hall of Fame API!'});
});


module.exports = router;