var gm = require('gm')

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
module.exports.gmResize = function ( original, w, h, q, targetImg ){
	var exInt = /^\d+$/; //數字驗證
  w = exInt.test(w) ? w : 150;
  h = exInt.test(h) ? h : '';
  q = exInt.test(q) ? q : 80;
  if (!w && !h) {
    return original;
  }
  var path = 'imgs/';
  var targetImg = new Date().getTime() + '.jpg'
  gm( original )
    .resize(w, h) 
    .quality(q)
    .noProfile()
    .write( path + targetImg, function(err){
      if (err) return console.dir(arguments);
      console.log('ok')
  
      return res.send(targetImg);
    }
	);
};