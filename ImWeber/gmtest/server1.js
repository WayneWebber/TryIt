var express = require('express');
var app = express();
var url = require('url');
var md5 = require('MD5');
var EventEmitter = require('events').EventEmitter,
	events = new EventEmitter();

var gm = require('./resize1');
app.use(express.static(__dirname + '/imgs'));

app.get('/', function (req, res){
	if (!req.query.src)
		return res.send('請輸入圖片路徑');
	// var originalUrl = req.originalUrl;
	var w1 = req.query.w;//
	var h1 = req.query.h;
	var q = req.query.q;
	var t = req.query.t || 0;
	var f = req.query.f || 1;
	var src = decodeURIComponent(req.query.src);
	var targetImg = '?w=' + w1 + '&h=' + h1 + '&q=' + q + '&f=' + f + '&t=' + t + '&src=' + src;
	src = url.parse(src);
	src = src.href.replace('%20', '+');
	gm.checkFile(md5(src) + '.jpeg', function(v){
		if(v){
			return res.sendfile('imgs/' + md5(src) + '.jpeg');
		}else{
			gm.gmResize(src, w1, h1, q, t, f, res, targetImg);
		}
	});
});

app.listen(3000);
console.log()
console.log('3000 is start!!')