var gm = require('gm');
var md5 = require('MD5');
var fs = require('fs');
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
	var exInt = /^\d+$/; //數字驗證
  w = exInt.test(w) ? w : null;
  h = exInt.test(h) ? h : null;
  q = exInt.test(q) ? q : 80;
  console.dir(original)
  if (null == w && null == h) {
    return   gm( original )
    .normalize()
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
    // original;
  }

  gm( original )
    .resize(w, h/*, "!" */)
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
