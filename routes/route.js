let router = require('express').Router();
let request = require('../utils/request');
let store = require('../utils/store');

router.use('/partners',require('./partners'));
router.use('/feedbacks',require('./feedbacks'));

// 登录相关
if(store.get('env') === 'development'){
    const login = require('../controllers/loginControllers');
    router.get('/login',login.login);
    router.get('/logout',login.logout);
    router.post('/login',login.loginIn);
}


router.get('/partners/user',function(req,res){
    const user_id = req.cookies.user_id || req.session.user_id ;
    if(!user_id){
        res.json({
            status: '1004',
            message: '没有登录'
        });
        return;
    }

    request
    .get('users/'+user_id)
    .then(data=>{
        const userInfo = data.response.record;
        res.json({
            status: 200,
            message: 'success',
            info: {
                id: userInfo.id,
                nick_name: userInfo.nick_name,
                avatar: userInfo.user_img_small,
            }
        });
    })
    .catch(err=>{
        res.json(err);
    })

});

module.exports = router;
