var gm = require('gm')

// resize and remove EXIF profile data
module.exports.gmResize = function ( original, w, h, q ){
	if (!w && !h) {
    return original;
  }
  var targetUrl = 'imgs/ccc.jpg';
  gm( original )
    .resize(w, h, q)
    .write( targetUrl, function(err){
      if (err) return console.dir(arguments);
    }
	);
  return 'http://127.0.0.1:3000/ccc.jpg';
};