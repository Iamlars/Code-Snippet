let store = {};

exports.get = function(key){
    return store[key] || '';
}
exports.set = function(key,value){
    store[key] = value;
}
exports.clear = function(){
    store = {};
}
exports.all = function(){
    return store
}