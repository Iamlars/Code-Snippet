let formidable = require('formidable');
let fs = require('fs');
let uploadFiles = [];

module.exports = function(req,res){
    let sess = req.session;
    const body = req.body;
    const maxSize = 2 * 1024 * 1024;
    const allowType = (type) =>{
        return ['png','jpg','jpeg','gif'].map(i=>`image/${i}`).includes(type);
    };

    const form = new formidable.IncomingForm({
        encoding: 'utf-8',
        uploadDir: 'public/upload',
        keepExtensions: true
    });

    if(req.headers['content-length'] > maxSize){
        res.json({
            status: 413,
            message: '文件过大'
        })
    }else{
        form.parse(req, function (err, fields, files) {
            if(err){
                res.json({
                    message: err
                })
                console.log('上传文件解析错误：');
                console.log(err);
                return;   
            }

            const avatar = files.avatar_view;

            if(!allowType(avatar.type)){
                res.json({
                    status: 403,
                    message: '文件格式不合法'
                })
                return;
            }

            // if(uploadFiles.length) fs.unlink(uploadFiles.shift());

            uploadFiles.push(avatar.path);

            res.json({
                status: 200,
                message: 'success',
                response: {
                    path: avatar.path.substr(6),
                    type: avatar.type,
                    name: avatar.name,
                    size: avatar.size,
                }
            })
        });
    }

}


