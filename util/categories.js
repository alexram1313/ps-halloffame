const categories = require('./categories.json');

var checkCategories = function (parent, category){
    var par = categories.parents.find( (p) => p.code == parent );
    if (par){
        var cat = par.categories.find( (c) => c.code == category );
        
        return !!cat;
    } else{
        return false;
    }
};

var getCategoryInfo = function (parent, category){
    try{
        return categories.parents.find( (p) => p.code == parent ).
                          categories.find( (c) => c.code == category );
    } catch(ex) {
        throw Error("Parent/Category not found");
    }
};

module.exports = {
    checkCategories:checkCategories,
    getCategoryInfo:getCategoryInfo
}