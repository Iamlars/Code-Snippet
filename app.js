let express = require('express'),
    app = express(),
    path = require('path'),
    ejs = require('ejs'),
    favicon = require('static-favicon'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    error = require('./utils/error'),
	store = require('./utils/store');

store.set('env',app.get('env'));
let configure = require('./utils/configure')(app);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(favicon());
app.use(error.ddos);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'assets/images')));
app.locals.basedir = path.join(__dirname, 'views');
app.engine('.html', ejs.renderFile);
app.enable('trust proxy');
app.use((req,res,next) => {
    if(app.get('env') !== 'development'){
        req.session.user_id = req.cookies.user_id;
        req.session.token = req.cookies.token;
    }
	store.set('session',req.session);
	next();
});

// 选中导航菜单
app.use(require('./utils/activeNav'));

// 应用路由
app.use(require('./routes/route'));

app.use(error.notFound);
app.use(error.serverError(app));
app.use(error.serverError(app));
app.use(error.serverError(app));

const port = require('./config.js').config().port;

app.listen(port, () => {
    console.log('server start,listen port '+port);
});


module.exports = app;
