let i18n = require('i18n');
let log4js = require('log4js');
let logger = log4js.getLogger('normal');
let assets = require('connect-assets');
let session = require('express-session');
let RedisStore = require('connect-redis')(session);
const assetsPath = require('../config.js').config().assets;

module.exports = function(app){
    app.use(session({
        store: new RedisStore(),
        secret: 'keyboard cat',
        cookie: {
            maxAge: 720000
        },
        resave: true,
        saveUninitialized: true,
        rolling:true
    }))

    app.use(assets({
        sourceMaps: false,
        paths: [
            'assets/stylesheets',
            'assets/javascripts',
            'public/sales',
        ]
    }));

    i18n.configure({
        locales:['en-US', 'zh-CN', 'zh-TW'],  // setup some locales - other locales default to en_US silently
        defaultLocale: 'zh-CN',
        directory: './locales',  // i18n 翻译文件目录
        updateFiles: false,
        indent: "\t",
        extension: '.js'  // 由于 JSON 不允许注释，所以用 js 会方便一点，也可以写成其他的，不过文件格式是 JSON
    });
    app.use(i18n.init);


    log4js.configure({
        appenders: [
            //{ type: 'console' }, //控制台输出
            {
                type: 'file', //文件输出
                filename: 'logs/access.log',
                maxLogSize: 1024,
                backups: 3,
                category: 'normal'
            }
        ]
    });

    logger.setLevel('INFO');
    app.use(log4js.connectLogger(logger, { level: log4js.levels.INFO }));
}
