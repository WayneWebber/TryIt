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

var pro13 = {},pro15 = {},air11 = {},air13 = {};
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

function macData(url, target, title){
  request({ url: 
    url}, function(err, resp, body) {
    if (!err && resp.statusCode == 200) {
      var $ = cheerio.load(body);
      target.html = '<h2>'+ title +'</h2>' + $('.box-content').html() + '<div style="clear:left"></div>';
    }
  });
}

var intervalId = setInterval(function(){ 
  macData(macbook_air11, air11, 'Air11');
  macData(macbook_air13, air13, 'Air13');
  macData(macbook_pro13, pro13, 'Pro13');
  macData(macbook_pro15, pro15, 'Pro15');
  app.get('/', function(req, res){
    res.send( css + head + air11.html + air13.html + pro13.html + pro15.html );
  });
},360000);
setTimeout(function(){ 
  macData(macbook_air11, air11, 'Air11', function(a){ if( undefined === a.html ){console.log(123)}else{return a}});
  macData(macbook_air13, air13, 'Air13', function(a){ if( undefined === a.html ){console.log(123)}else{return a}});
  macData(macbook_pro13, pro13, 'Pro13', function(a){ if( undefined === a.html ){console.log(123)}else{return a}});
  macData(macbook_pro15, pro15, 'Pro15', function(a){ if( undefined === a.html ){console.log(123)}else{return a}});
  app.get('/', function(req, res){
    res.send( css + head + air11.html + air13.html + pro13.html + pro15.html );
  });
  app.listen(3000);
  console.log('is run 3000');
}, 1000);
