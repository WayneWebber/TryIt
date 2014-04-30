var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
 
var Todo = new Schema({
    user_id    : String,
    content    : String,
    updated_at : Number
});
 
mongoose.model('wn_Todo', Todo);
 
// mongoose.connect('mongodb://localhost/wayne-todo');
mongoose.connect('mongodb://tryit:12345678@10.7.10.89:27017/WW')