var gm = require('gm');
var md5 = require('MD5');
var fs = require('fs');
var EventEmitter = require('events').EventEmitter,
    evt = new EventEmitter();
var h1;
var w1;
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
module.exports.gmResize = function ( original, w1, h1, q, t, f, res, targetImg ){
  var thePic = gm( original );
  var w;
  var h;
  var h1Get;
  var format;
  var newPic = 'imgs/' + md5( targetImg );

  var exInt = /^\d+$/; //數字驗證
  w = exInt.test(w) ? w : null;
  h = exInt.test(h) ? h : null;
  q = exInt.test(q) ? q : 80;
  
  if ( w1 && h1 ){
    t = '!';
  }

  //取得圖片的規格
  thePic.format(function (e, v){
    if (e){
      console.log(e);
      return res.send('錯誤：圖片格式' + e.signal);
    }
    format = v.toLowerCase();
    console.log('取出圖片規格')
    //算出原始圖片高跟寬
    thePic.size(function (e, v){
      w = v.width;
      h = v.height;
      h1Get = (h*w1)/w;
      console.log('取得原始圖片寬跟高')
      evt.emit('dataOK');
    });
  });

  evt.on('dataOK', function (){
    if ( w > w1 || w1 == null ){
      thePic
        .resize( w1 , h1, t)
        .normalize()//原始圖的尺寸
        .quality( q )
        .noProfile()
      .write( newPic + '.jpg' /*+ '.' + format*/, function(err){
        if (err){
          console.log(err);
          res.statusCode = 404
          return res.send('死掉了 請聯絡你家工程師...')
        }
        console.info("原始尺寸ok");
        return res.sendfile( newPic + '.jpg')
      });
    }else{
      thePic
        .resize( w1 , h1Get, "!")
        .normalize()//原始圖的尺寸
        .quality( q )
        .noProfile()
      .write( newPic + '.jpg' /*+ '.' + format*/, function(err){
        if (err){
            console.log(err);
            return res.send('只有寬的死掉了 請聯絡你家工程師...')
        }
        console.info("原始尺寸ok");
        return res.sendfile( newPic + '.jpg')
      });
    }
  });
}

/**
確認檔案是否存在

@method checkFile
@param filename 檔案的路徑
@return info 回傳信息 true或false
*/
module.exports.checkFile = function (filename, next) {
  fs.exists( 'imgs/' + filename, function (v) {
    next(v);
  });
};
/**
取得原始圖片寬跟高

@method h1Get
@param w1 要放大的寬度
*/
function imgFormat(src) {
  var h1;
  gm( 'imgs/' + src + ".jpeg" ).size(function (e, v){
    format = v.toLowerCase();
    evt.emit('imgFormat');
  })
  evt.once('imgFormat', function (){
    return format;
  });
};
