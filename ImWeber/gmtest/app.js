var fs = require('fs')
  , gm = require('gm')
  , dir = __dirname + '/imgs';

// resize and remove EXIF profile data
function gmResize ( sourceUrl, w, h, targetUrl ){
  gm( sourceUrl )
    .resize(w, h, '!')
    .write( targetUrl, function(err){
      if (err) return console.dir(arguments)
    });
}
gmResize(process.argv[2],process.argv[3],process.argv[4],process.argv[5])
// gm(dir + '/img.jpg')
//   .resize(null,200)
//   .write(dir + '/resize.jpg', function(err){
//     if (err) return console.dir(arguments)
//   }
// )
// gm('./img.jpg')
// .resize(240, 240)
// .noProfile()
// .write('resize.png', function (err) {
//   if (!err) console.log('done');
// });

// // obtain the size of an image
// gm('/path/to/my/img.jpg')
// .size(function (err, size) {
//   if (!err)
//     console.log(size.width > size.height ? 'wider' : 'taller than you');
// });

// // output all available image properties
// gm('/path/to/img.png')
// .identify(function (err, data) {
//   if (!err) console.log(data)
// });

// // pull out the first frame of an animated gif and save as png
// gm('/path/to/animated.gif[0]')
// .write('/path/to/firstframe.png', function (err) {
//   if (err) console.log('aaw, shucks');
// });

// // auto-orient an image
// gm('/path/to/img.jpg')
// .autoOrient()
// .write('/path/to/oriented.jpg', function (err) {
//   if (err){
//     console.error(err);
//   }
// })

// // crazytown
// gm('/path/to/my/img.jpg')
// .flip()
// .magnify()
// .rotate('green', 45)
// .blur(7, 3)
// .crop(300, 300, 150, 130)
// .edge(3)
// .write('/path/to/crazy.jpg', function (err) {
//   if (!err) console.log('crazytown has arrived');
// })

// // annotate an image
// gm('/path/to/my/img.jpg')
// .stroke("#ffffff")
// .drawCircle(10, 10, 20, 10)
// .font("Helvetica.ttf", 12)
// .drawText(30, 20, "GMagick!")
// .write("/path/to/drawing.png", function (err) {
//   if (!err) console.log('done');
// });

// // creating an image
// gm(200, 400, "#ddff99f3")
// .drawText(10, 50, "from scratch")
// .write("/path/to/brandNewImg.jpg", function (err) {
//   // ...
// });