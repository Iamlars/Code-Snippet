exports.notFound = function(req,res,next){
	var err = new Error('Not Found');
	err.status = 404;
    next(err); 
}

let ddosCase = function(req,res,next,max){
    let size = req.headers['content-length'];
    if(size > max * 1024){
        res.statusCode = 413;
        res.json({message: '文件过大'})
    }else{
        next();
    }
}

exports.ddos = function(req,res,next){
    next();
    // let contentType = req.headers['content-type'];
    // let type = contentType ? contentType.split(';').shift() : '';
    // if(!type) next();
    // switch(type){
    //     case 'application/x-www-form-urlencoded': ddosCase(req,res,next,32)
    //     break;
    //     case 'multipart/form-data': ddosCase(req,res,next,10 * 1024)
    //     break;
    //     default: next();
    // }
}

exports.serverError = function(app){
    return function(err, req, res, next){
        if (app.get('env') === 'development') {
            // const code = err.status;
            // res.url = code+'.html';
            // if([403,404,422,500,502].indexOf(code) > -1){
            //     res.render('../public/sales/'+code+'.html');
            // }
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        }else{
            res.status(err.status || 500);
            res.render('error', {
                message: 'server side error',
                error: ''
            });
        }

    }
}
