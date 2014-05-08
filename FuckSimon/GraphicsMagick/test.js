var gm = require('gm');

gm('./GoodMan.jpg')
  .font('w9.ttf')
  .fontSize(36)
  .drawText(30, 35, '幹你娘還要下載字型檔')
  .write('./output/output.jpg', function(err){
    if(err){
      console.dir(err);
      process.exit();
    }
    console.dir('Success, image in ./output/output.jpg');
    process.exit();
  });
