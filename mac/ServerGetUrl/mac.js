var request = require('request')
  , cheerio = require('cheerio')
  ,iconv = require('iconv-lite')
  ,express = require('express')
  ,app = express();

var macbook_air11 = 'http://store.apple.com/tw/browse/home/specialdeals/mac/macbook_air/11';
var macbook_air13 = 'http://store.apple.com/tw/browse/home/specialdeals/mac/macbook_air/13';
var macbook_pro13 = 'http://store.apple.com/tw/browse/home/specialdeals/mac/macbook_pro/13';
var macbook_pro15 = 'http://store.apple.com/tw/browse/home/specialdeals/mac/macbook_pro/15';
var mac = 'http://store.apple.com/tw/browse/home/specialdeals/clearance/mac';

var html,pro13,pro15,air11,air13;
var head = '<div class="header">'
      +'<a href="http://store.apple.com/tw/browse/home/specialdeals/mac">MAC官網</a>'
      +'<a href="http://store.apple.com/tw/browse/home/specialdeals/mac/macbook_air">macAir</a>'
      +'<a href="http://store.apple.com/tw/browse/home/specialdeals/mac/macbook_pro">macPro</a>'
      +'<a href="http://store.apple.com/tw/browse/home/specialdeals/clearance/mac">清倉mac</a>'
      +'</div>';
var css = '<style>'
      +'body{font-family:"Lucida Grande",Helvetica,Arial,Verdana,sans-serif;}'
      +'.specs{font-size:10px;width:380px;height:145px;}'
      +'.purchase-info a{display:none;}'
      +'table{float:left;}'
      +'h2{text-align: center;margin-bottom: 0px;border-bottom: 3px solid #ddd;}'
      +'.header a:active{cursor:pointer;position:relative;top:2px;}'
      +'.header{margin-bottom:5px;}'
      +'.header a{font:bold 15px Arial, Helvetica, sans-serif;font-style:normal;color:#ffffff;background:#000000;border:0px solid #ffffff;text-shadow:0px 0px 0px #222222;box-shadow:0px 0px 0px #000000;-moz-box-shadow:0px 0px 0px #000000;-webkit-box-shadow:0px 0px 0px #000000;border-radius:10px 10px 10px 10px;-moz-border-radius:10px 10px 10px 10px;-webkit-border-radius:10px 10px 10px 10px;width:44px;padding:11px 35px;cursor:pointer;margin:0 5px;}'
      +'p.price{font-size:20px;background-color: #F9F2F4;color: #C7254E;padding:2px 4px;}'
      +'</style>'; 
// request({ url: macbook_pro13}, function(err, resp, body) {
//   if (!err && resp.statusCode == 200) {
//     var $ = cheerio.load(body);
//     pro13 = '<h2>Pro13</h2>' + $('.box-content').html() + '<div style="clear:left"></div>';
//   }
// });
// request({ url: macbook_pro15}, function(err, resp, body) {
//   if (!err && resp.statusCode == 200) {
//     var $ = cheerio.load(body);
//     pro15 = '<h2>Pro15</h2>' + $('.box-content').html() + '<div style="clear:left"></div>';
//   }
// });
// request({ url: macbook_air11}, function(err, resp, body) {
//   if (!err && resp.statusCode == 200) {
//     var $ = cheerio.load(body);
//     air11 = '<h2>Air11</h2>' + $('.box-content').html() + '<div style="clear:left"></div>';
//   }
// });
// request({ url: macbook_air13}, function(err, resp, body) {
//   if (!err && resp.statusCode == 200) {
//     var $ = cheerio.load(body);
//     air13 = '<h2>Air13</h2>' + $('.box-content').html() + '<div style="clear:left"></div>';
//   }
// });
// app.get('/', function(req, res){
//   res.send( css + head + pro13 + pro15 + air11 + air13  );
// });

app.listen(3000);
console.log('is run 3000')
var i = 0; 
setInterval(function(){ 
  console.log('count: %s', i);
  i++;
}, 1000);
function macData(url, target, title){
  request({ url: url}, function(err, resp, body) {
    if (!err && resp.statusCode == 200) {
      var $ = cheerio.load(body);
      target = '<h2>'+ title +'</h2>' + $('.box-content').html() + '<div style="clear:left"></div>';
      return target;
    }
  });
}

var intervalId = setInterval(function(){ 
  macData(macbook_air13, air13, 'Air13');
  console.log(air13);
  app.get('/', function(req, res){
    res.send( css + head + air13  );
  });
},10000);
