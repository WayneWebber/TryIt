var gm = require('gm');
var md5 = require('MD5');
var fs = require('fs');
var cheerio = require("cheerio");
// var emitter = require("events").EventEmitter;
// evt = new emitter();
var EventEmitter = require('events').EventEmitter,
    evt = new EventEmitter();
var h1;//倍數
var w1;//倍數
/**
一個縮圖的api

@method gmResize
@param original {String} 原圖的路徑
@param w {Int} 寬度
@param h {Int} 高度
@param q {Int} 品質 (1~100)
@param  {Int} 品質 (1~100)
@return {String} memcached 的 key
*/
module.exports.gmResize = function ( original, w, h, q, res ){

  gm(original).size({bufferStream:true},function(err,size){
    if(err){
      console.info(err)
    }else{
      originalw = size.width;
      originalh = size.height;
      evt.emit('resize');
      return  originalw,originalh;
    }
  // res.originalw.width = size.width;

   });


	var exInt = /^\d+$/; //數字驗證
  w = exInt.test(w) ? w : null;
  h = exInt.test(h) ? h : null;
  q = exInt.test(q) ? q : 80;
  console.dir(w + '輸入寬度');
  console.dir(h + '輸入長度');
  evt.once('resize', function() {
    console.log(originalw+'原始圖寬度');
    console.log(originalh+'原始圖高度');
    w1 = w/originalw;
    h1 = h/originalh;
    evt.emit('go');


});
evt.once('go', function() {
  console.dir(h1);
  console.dir(w1);
  if (null == w && null == h) {
    return   gm( original )
    .normalize()//原始圖的尺寸
    .quality(q)
    .noProfile()
    .write( 'imgs/' + md5(original) + '.' + original.split(".").pop(), function(err){
      if (err){
          console.log(err);
          return res.send('死掉了 別再按了好嗎...')
      }
      console.info("原始尺寸ok");

      return res.sendfile('imgs/' + md5(original) + '.jpg')
    }
    );
    // original;
  };
  if (null != w && null == h) {
  h = originalh*w1;
  console.dir(h);
  gm( original )
    .resize(w,h,'!')
    .quality(q)
    .noProfile()
    .write( 'imgs/' + md5(original) + '.' + original.split(".").pop(), function(err){
      if (err){
        console.log(err);
        return res.send('死掉了 別再按了好嗎...')
      }
      console.info("ok");

      return res.sendfile('imgs/' + md5(original) + '.jpg')
    }
	 );
  };
  if (null == w && null != h) {
    w = originalw*h1;
    console.dir(w);
    // var receiveh= h;
    // if(receiveh>3000){
    //   receiveh=1280;
    //   console.dir(123456)
    // };
  gm( original )
    .resize(w,h,'!')
    .quality(q)
    .noProfile()
    .write( 'imgs/' + md5(original) + '.' + original.split(".").pop(), function(err){
      if (err){
        console.log(err);
        return res.send('死掉了 別再按了好嗎...')
      }
      console.info("ok");

      return res.sendfile('imgs/' + md5(original) + '.jpg')
    }
   );
  };
  if ( w && h) {
  gm( original )
    .resize(w,h)
    .quality(q)
    .noProfile()
    .write( 'imgs/' + md5(original) + '.' + original.split(".").pop(), function(err){
      if (err){
        console.log(err);
        return res.send('死掉了 別再按了好嗎...')
      }
      console.info("ok");

      return res.sendfile('imgs/' + md5(original) + '.jpg')
    }
   );
  };});
};

/**
確認檔案是否存在

@method checkFile
@param filename 檔案的路徑
@return info 回傳信息 true或false
*/
module.exports.checkFile = function (filename) {
  fs.exists( 'imgs/' + filename, function (info) {
    return info;
  });
};
