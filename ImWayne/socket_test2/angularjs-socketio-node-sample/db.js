var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var Todo = new Schema({
    user_id    : String,

    text    : String,
    updated_at : Number,
    done       : Boolean
});

mongoose.model('wn_Todo_socket', Todo);

// mongoose.connect('mongodb://localhost/wayne-todo');
mongoose.connect('mongodb://tryit:12345678@10.7.10.89:27017/WW')
