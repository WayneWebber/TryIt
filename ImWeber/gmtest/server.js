var express = require('express');
var app = express();
var gm = require('./resize');
var url = require('url');
// app.use(express.static(__dirname + '/imgs'));

app.get('*', function (req, res){
	
	var w = req.query.w;
	var h = req.query.h;
	var q = req.query.q;
	var src = decodeURIComponent(req.query.src);
	var targetImg = '?w=' + w + '&h=' + h + '&q=' + q + '&src=' + src;
	src = url.parse(src);
	src = src.href.replace('%20', '+');
	gm.gmResize(src, w, h, q, targetImg);
	// var doc = gm.gmResize(src, w, h, q, targetImg) ? gm.gmResize(src, w, h, q, targetImg) :'hello';
	// res.send(doc);

});

app.listen(3000);