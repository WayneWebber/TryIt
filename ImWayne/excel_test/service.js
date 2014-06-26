// call the packages we need
var express = require("express"); // call express
var app = express(); // define our app using express
var bodyParser = require("body-parser");
var cons = require('consolidate');
var nodeExcel = require('excel-export');
var xss = require('xss');
var html = xss('<script>alert("xss");</script>');
console.log(html);

app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views')
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser());

var mongoose = require("mongoose");
var Schema   = mongoose.Schema;
//建立資料庫的schema
var datamodel = new Schema({
    count   : Number,
    name    : String,
    tel    : String,
    _id : String,
    add       : String,
    mail         : String,
    updated_at : Number
});
//連接資料庫
mongoose.connect("mongodb://tryit:12345678@10.7.10.89:27017/WW");
var datadetial = mongoose.model('exceldata', datamodel);
var port = process.env.PORT || 8080; // set our port
// =============================================================================

app.get('/', function(req, res){
  res.render('html5');
});

app.post('/redirect', function(req, res){
//寫入start
  var count;
  if('true' == req.body.bingo){
          console.dir('bingo is true');
          count = 3;
  }else{
    count = 1;
  }
  var now = Math.floor(+new Date() / 1000);
  var test = new datadetial(
    { count: count,
      name: req.body.name,
      _id: req.body.id,
      tel: req.body.tel,
      add: req.body.add,
      mail: req.body.mail,
      updated_at : now
    }
  );
//儲存資料庫
  test.save(function (err) {
    if (err) {
      console.log('can not writing into mongodb');
      datadetial.find({'_id':req.body.id} ,function(err, docs) {
        var addcount;
        //找出每一個id的統計數字
        for(var idx in docs){
            var doc = docs[idx];
            addcount = doc.count;
        }
        var rewrite = 1;
        if('true' == req.body.bingo){
          console.dir('bingo is true');
          rewrite = 3;
        }
        console.dir(rewrite);
        test.update({count: addcount+rewrite},function(err){
          if (err) {
            console.log('err')
          }
        });
      });
    }
    else{
    console.log('success writing into mondodb');
    }
  });
//寫入end
    res.redirect('/');
});

// excel export
// =============================================================================
app.get('/Wayne', function(req, res){
  datadetial.find().sort('updated_at').exec(function(err,docs) {
    var conf ={};
    conf.stylesXmlFile = "styles.xml";
    conf.cols = [{
        caption:'身分證字號',
        type:'string'
    },{
        caption:'姓名',
        type:'string'
    },{
        caption:'手機號碼',
        type:'string'
    },{
        caption:'地址',
        type:'string'
    },{
        caption:'email',
        type:'string'
    },{
        caption:'次數',
        type:'number'
    }

    ];
    conf.rows = [];
    for(var idx in docs){
      var doc = docs[idx];
      var exceldetial = [doc._id, doc.name, doc.tel, doc.add, doc.mail, doc.count];
      conf.rows.push(exceldetial);

    }

    var result = nodeExcel.execute(conf);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats');
    res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
    res.end(result, 'binary');
    // res.send('hello world')
    });
});
// START THE SERVER
// =============================================================================
app.listen(port);
console.log("Express server listening on port" + port);
