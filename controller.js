let request = require('../utils/request');
let store = require('../utils/store');
let friendlylinks = store.get('friendlylinks');;
exports.index = function (req, res){
    let salesData = {};
    let banner = {};
    Promise.all([
        request.get('aviation/homes'),
        request.get('friendlylinks'),
        request.get('ads/aviation_homes_slide'),
        request.get('user/questionnaires.json',{category: '2016-08-25'})
        ]
    )
    .then(data=>{
        res.locals.friendlylinks = data[1].response;
        res.render('sales/index', {
            title: '特惠机票',
            data: data[0],
            banner: data[2].response.records,
            questionnaires: data[3].response.records,
        });
    })
    .catch(err=>{
        res.render('sales/index', {
            title: '特惠机票',
            data: err
        });
    }) 
};

exports.user = function (req, res){
    const user_id = req.cookies.user_id || req.session.user_id;
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
};

/**
 * @api {POST} /partners/list 获取特惠机票列表
 * @apiName partners_list
 * @apiGroup partners
 * @apiVersion 0.0.1
 * @apiPermission anyone
 *
 * @apiParam {string} [start_city] 出发城市
 * @apiParam {string} [arrive_city] 到达城市
 *
 * @apiSuccessExample Success-Response
 *   {
 *         message: 'success',
 *         ...
 *   }
 *
 */
exports.showAll = function (req, res){
    request
    .get('aviation/homes/sales',req.qurery)
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.json(err)
    })
};

function flightTime(arrive,start){

    var _timeStamp = new Date(arrive) - new Date(start),
        _flightTimeHours = Math.floor(_timeStamp/(3600*1000)),
        _flightTimeMinutes = Math.floor((_timeStamp/(3600*1000) - _flightTimeHours) * 60);
        
    return _flightTimeHours+'H '+_flightTimeMinutes+'M';
}


exports.show = function (req, res){
    

    Promise.all([request.get('friendlylinks'),request.get('aviation/plans/'+req.params.id)])
    .then(data=>{
        var _plans = data[1].response.record,
            _friendlylinks = data[0].response;
        res.render('sales/show', {
            title: '特惠机票',
            data: data[1],
            flightTime: flightTime(_plans.arrive_time,_plans.start_time),
            backFlightTime: flightTime(_plans.back_arrive_time,_plans.back_start_time),
            friendlylinks:_friendlylinks,
            pId:req.params.id
        });
    })
    .catch(err=>{
        res.json(err)
    }) 
};

exports.trades = function (req, res){

    var sess = req.session,
        body = req.body;
        body.user_id = sess.user_id;

    request
        .post('aviation/trades',body)
        .then((data)=>{
            res.json(data);
        })
        .then((err)=>{
            res.json(err);
        })

}

exports.isTrades = function(req,res){

    request.get('user/trades/is_trade',{plan_id:req.query.pid}).then(data =>{
        res.json(data);        
    });
    
}




exports.add = function (req, res){
    
};
exports.update = function (req, res){

};
exports.del = function (req, res){

};

/**
 * @api {POST} /partners/customization 提交私人定制
 * @apiName partners_customization
 * @apiGroup partners
 * @apiVersion 0.0.1
 * @apiPermission anyone
 *
 * @apiParam {string} content 私人定制内容
 * @apiParam {string} from_type 来源页面
 *
 * @apiSuccessExample Success-Response
 *   {
 *         message: 'success',
 *         ...
 *   }
 *
 */
exports.customization = function (req, res){
    let len = req.body.content.length;
    if(len<1 || len>300){
        res.json({
            message: '内容需在1-300字之间'
        })
    }

    request
    .post('user/issues.json',{
        user_issue: req.body,
    })
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.json(err)
    })
};


/**
 * @api {POST} /partners/questionnaire/:id 喜欢问卷调查
 * @apiName partners_questionnaire
 * @apiGroup partners
 * @apiVersion 0.0.1
 * @apiPermission anyone
 *
 * @apiParam {string} id 问卷题目id
 *
 * @apiSuccessExample Success-Response
 *   POST /partners/questionnaire/:id
 *   {
 *         message: 'success',
 *         ...
 *   }
 *
 */
exports.questionnaireLike = function (req, res){
    request
    .put('user/questionnaire/like/'+req.params.id)
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.json(err);
    })
};

/**
 * @api {get} /partners/questionnaire/list 获得问卷列表
 * @apiName partners_questionnaire_list
 * @apiGroup partners
 * @apiVersion 0.0.1
 * @apiPermission anyone
 *
 * @apiSuccessExample Success-Response
 *   {
 *         message: 'success',
 *         ...
 *   }
 *
 */
exports.questionnaire = function (req, res){
    request
    .get('user/questionnaires.json',{
        category: '2016-08-25'
    })
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.json(err);
    })
};
