var express = require('express');
var app = express();
var gm = require('./resize');
var url = require('url');
app.use(express.static(__dirname + '/imgs'));

app.get('*', function (req, res){
	var w = req.query.w;
	var h = req.query.h;
	var q = req.query.q;
	var src = decodeURIComponent(req.query.src);
	src = url.parse(src);
	src = src.href.replace('%20', '+');
	var img = "<img src="+gm.gmResize(src, w, h, q)+" />"
	var doc = gm.gmResize(src, w, h, q) ? img :'hello';
	res.send(doc);

});

app.listen(3000);