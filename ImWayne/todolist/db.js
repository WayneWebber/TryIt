var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
 
var Todo = new Schema({
    user_id    : String,
    content    : String,
    updated_at : Date
});
 
mongoose.model('wayne_Todo', Todo);
 
mongoose.connect('mongodb://localhost/express-todo');
// mongoose.connect('mongodb://tryit:12345678@10.7.10.89:27017/WW');
