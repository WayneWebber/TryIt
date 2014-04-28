
// npm install express
var format = require('util').format
    , express = require('express')
    , swig = require('swig')
    , app = express();

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.render('index.html', { });
});

app.listen(12345);
console.log('Express server listening on port 12345');
