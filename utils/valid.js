let validator = require('validator');

module.exports = function(option){
    return new Promise((resolve, reject)=>{
        if(validator[option.type](option.field,option.extend || {})){
            resolve();
        }else{
            reject(option)
        }
    })
}