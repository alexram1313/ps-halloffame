var mongoose = require ('mongoose');
var crypto   = require('crypto');

var uristring = 
  process.env.MONGODB_URI || 
  'mongodb://localhost/HelloMongoose';


// Makes connection asynchronously.  Mongoose will queue up database
// operations and release them when the connection is complete.
mongoose.connect(uristring, function (err, res) {
  if (err) { 
    console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
    console.log ('Succeeded connected to: ' + uristring);
  }
});


/*
    MongoDB Database Structure
    [
        {
            "ip1": IP Address (timestamp for older entries)
            "votes1":{
                "category11":"nominee11",
                "category12":"nominee12",
                ...,
                "category1M":"nominee1M"
            }
        },
        {
            "ip2": IP Address (timestamp for older entries)
            "votes2":{
                "category21":"nominee21",
                "category22":"nominee22",
                ...,
                "category2M":"nominee2M"
            }
        },
        ...,
        {
            "ipN": IP Address (timestamp for older entries)
            "votesN":{
                "categoryN1":"nomineeN1",
                "categoryN2":"nomineeN2",
                ...,
                "categoryNM":"nomineeNM"
            }
        }
    ]
 */


var voteSchema = mongoose.Schema({
    ip: String,
    votes: Object
});

var Vote = mongoose.model('Vote', voteSchema);


function ipHash(ip){
    return crypto.createHash('sha256').update(ip).digest('hex');
}

//IPs will be in the "ip" property of a Vote document
//Older votes may actually have a timestamp in place
//due to legacy Google Forms counting.
var ipCounted = function(ip, callback){
    Vote.find({ip:ipHash(ip)}, function(err, docs){
        if (docs.length){
            callback(true);
        }
        else{
            callback(false);
        }
    });
}

//First check the IP, then write to the database
var enterData = function(ip, data, callback){
    ipCounted(ip, function(counted){
        if (counted){
            callback(false, "IP already counted")
        }else{
            //Now save the vote document
            var tempVote={
                ip:ipHash(ip),
                votes:data
            }
            var newVote = new Vote(tempVote);
            newVote.save(function (err) {if (err) console.log ('Error on save!')});
            callback(true, false);
        }
    });
}

var retrieveData = function(callback){

    //Retrieve all Vote documents in MongoDB
    Vote.find(function(err, docs){
        if (err){
            callback(err, '');
        }

        callback(false, docs);
    });
}

var getTotalCount = function(callback){

    //Retrieve length of MongoDB (a.k.a, # of Vote documents)
     Vote.find(function(err, docs){
        callback(docs.length);
    });
}

module.exports = {
    ipCounted:    ipCounted,
    enterData:    enterData,
    retrieveData: retrieveData,
    getTotalCount:getTotalCount
};