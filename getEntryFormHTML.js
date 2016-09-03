var cheerio = require('cheerio');
var fs = require('fs');

function geFileList(path) {
    var filesList = [];
    readFile(path, filesList);
    return filesList;
}
 
//遍历读取文件
function readFile(path, filesList) {
    files = fs.readdirSync(path); //需要用到同步读取
    files.forEach(walk);
    
    function walk(file) {
        states = fs.statSync(path + '/' + file);
        if (states.isDirectory()) {
            readFile(path + '/' + file, filesList);
        } else {
            filesList.push(path + '/' + file);
        }
    }
}

// 获取views下面全部页面的js

let allJs = {};
geFileList('./views').forEach(item=>{
    var html = fs.readFileSync(item,"utf-8");
    var $ = cheerio.load(html);
    var entry = {};
    $('.js').each(function(i,n){
        var src = $(this).attr('src');
        allJs[src] = './assets/javascripts/'+src;
    })
});

module.exports = {
  entry: allJs,
  output: {
    path: './dist/js',
    filename: "[name]"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
}
