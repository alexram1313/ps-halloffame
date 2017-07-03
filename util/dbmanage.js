var low = require('lowdb');

var db = low('./results.json', {
    storage: require('lowdb/lib/storages/file-async')
});

db.defaults({
    data:{}
}).write()


/*
    Database Structure
    {
        "data":{
            IP Address (timestamp for older entries):{
                "category":"nominee"
            }
        }
    }
 */

var ipCounted = function(ip){
    return db.has('data.'+ip);
}

var enterData = function(ip, data, callback){
    if (!module.exports.ipCounted(ip)){
        db.set('data.' + ip, data).write();
        callback(true, false);
    } else {
        // callback(success, err)
        callback(false, "IP already counted")
    }
}

var retrieveData = function(callback){
    // callback(err, data)
    try {
        callback(false, db.get('data').value());
    } catch(ex){
        callback(ex, '');
    }
}

var getTotalCount = function(){
    return Object.keys(db.get('data').value()).length;
}

module.exports = {
    ipCounted:    ipCounted,
    enterData:    enterData,
    retrieveData: retrieveData,
    getTotalCount:getTotalCount
};