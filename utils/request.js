let originRequest = require('request');
var colors = require('colors/safe');
let store = require('./store');
let config = require('../config');
let apiUrl = config.config().api;
let code = config.code();
let error = colors.red;

let errorTip = function(type,url,body){
  console.log();
  console.log();
  console.log( error('rails接口错误：'+'===='.repeat(16)) );
  console.log('方法:'+colors.yellow(type)+', 接口: '+colors.green(apiUrl+url)+', 详细错误信息: ');
  console.log(body);
  console.log( error('===='.repeat(20)) );
  console.log();
  console.log();
}

let options = function(upload,url,data){
  let session = store.get('session');
  if(!upload){
    return {
        headers: {
          'client-type':'manage',
          'token': session.token,
          'user-id':session.user_id  
        },
        form: data,
        url: apiUrl+url,
      }
  }else{
      return {
        headers: {
          'client-type':'manage',
          'token': session.token,
          'user-id':session.user_id 
        },
        formData: data,
        url: apiUrl+url,
      }
  }

};

let fecth = (type,url,data={},put)=> {
  return new Promise((resolve, reject) => {
    let upload = false;
    if(type === 'upload'){
      type = 'post';
      upload = true;
    }
    if(put){
      type = 'put';
    }
    originRequest[type](options(upload,url,data), (err,response,body) => {
        if(err){
          errorTip(type,url,err);
          reject(err);
        }else{
          try{
            let data = JSON.parse(body);
            if(data.message === 'success'){
              resolve(data);
            }else{
              errorTip(type,url,body);
              reject({
                status: data.status,
                message: code[data.status],
              });
            }
            
          }
          catch(err){
            errorTip(type,url,body);
            reject({
              status: 500,
              message: code[500],
            });
          }
        }      
      })
  }) 
}


let request = (options) => {
  return fecth(options.type, options.url, options.form)
}

request.get = (url,data) => {
  return fecth('get',url,data)
}
request.post = (url,data) => {
  return fecth('post',url,data)
}
request.put = (url,data) => {
  return fecth('put',url,data)
}
request.upload = (url,data,type) => {
  return fecth('upload',url,data,type)
}
request.delete = (url) => {
  return fecth('delete',url)
}

module.exports = request;
