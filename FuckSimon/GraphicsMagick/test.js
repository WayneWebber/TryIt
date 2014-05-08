var gm = require('gm');

gm('./GoodMan.jpg')
  .font('w9.ttf')
  .fontSize(36)
  .drawText(30, 35, '幹你娘還要下載字型檔')
  .write('./G1.jpg', function(err){
    if(err) console.dir(err);
    console.dir('Success!!!');
    process.exit();
  });
