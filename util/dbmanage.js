var mongoose = require ("mongoose");

var uristring = 
  process.env.MONGODB_URI || 
  'mongodb://localhost/HelloMongoose';

// var low = require('lowdb');

// var db = low('./results.json', {
//     storage: require('lowdb/lib/storages/file-async')
// });

// db.defaults({
//     data:{}
// }).write();


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
            "ip": IP Address (timestamp for older entries)
            "votes":{
                "category1":"nominee1",
                "category2":"nominee2",
                ...,
                "categoryN":"nomineeN"
            }
            
            
        }
    ]
 */


var voteSchema = mongoose.Schema({
    ip: String,
    votes: Object
});

var Vote = mongoose.model('Vote', voteSchema);


//IPs will be keys. Just check if the key is there
var ipCounted = function(ip, callback){
    // return db.has('data.'+ip).value();
    Vote.find({ip:ip}, function(err, docs){
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
            var tempVote={
                ip:ip,
                votes:data
            }
            var newVote = new Vote(tempVote);
            newVote.save(function (err) {if (err) console.log ('Error on save!')});
            callback(true, false);
        }
    })

    // if (!module.exports.ipCounted(ip)){
    //     db.set('data.' + ip, data).write();
    //     callback(true, false);
    // } else {
    //     // callback(success, err)
    //     callback(false, "IP already counted")
    // }
}

var retrieveData = function(callback){
    // // callback(err, data)
    // try {
    //     callback(false, db.get('data').value());
    // } catch(ex){
    //     callback(ex, '');
    // }


    Vote.find(function(err, docs){
        if (err){
            callback(err, '');
        }

        callback(false, docs);
    });
}

var getTotalCount = function(callback){
     Vote.find({ip:ip}, function(err, docs){
        callback(docs.length);
    });
}

module.exports = {
    ipCounted:    ipCounted,
    enterData:    enterData,
    retrieveData: retrieveData,
    getTotalCount:getTotalCount
};