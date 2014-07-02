var express = require('express');
var app = express();
var gm = require('./resize');
var url = require('url');
var md5 = require('MD5');
app.use(express.static(__dirname + '/imgs'));

app.get('/', function (req, res){
	var w = req.query.w;
	var h = req.query.h;
	var q = req.query.q;
	var src = decodeURIComponent(req.query.src);
	var targetImg = '?w=' + w + '&h=' + h + '&q=' + q + '&src=' + src;
	src = url.parse(src);
	src = src.href.replace('%20', '+');
	if( gm.checkFile(md5(src)) ){
		return res.sendfile('imgs/' + md5(original) + '.jpg');
	}else{
		gm.gmResize(src, w, h, q, res);
	}
});

app.listen(3000);
console.log()
console.log('3000 is start!!')