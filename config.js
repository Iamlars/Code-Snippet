const store = require('./utils/store');
const env = store.get('env');
const YAML = require('yamljs');
const settings = YAML.load('./config/host.yml');
const errorCode = YAML.load('./locales/errorCode/zh.yml');

exports.config = function(){
    let type = 'pro';
    if(env === 'development'){
        type = 'dev';
    }
    return settings[type]  
}
exports.code = function(){
    return errorCode 
}