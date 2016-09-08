let express = require('express');
let app = express();
let ejs = require('ejs');
let path = require('path');
app.set('view engine', 'ejs');
app.engine('.html', ejs.renderFile);
app.use(express.static(path.join(__dirname, 'views')));
app.get('/',function (req,res) {
    res.render('gro.html')
})

app.listen(3000,function(){
    
})