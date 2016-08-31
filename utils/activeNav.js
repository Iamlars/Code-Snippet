module.exports = function(req, res, next){
    res.locals.activeNav = function(path){
      if(path === "/" && req.originalUrl === '/'){return 'active'};
      return req.originalUrl.indexOf(path) === 0 ? 'active' : '';
    }
    next();
}
