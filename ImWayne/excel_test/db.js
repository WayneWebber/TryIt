var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var datamodel = new Schema({
    user_id    : String,

    text    : String,
    updated_at : Number,
    done       : Boolean,
    id         : String
});

mongoose.model('test', datamodel);

// mongoose.connect('mongodb://localhost/wayne-todo');
mongoose.connect("mongodb://tryit:12345678@10.7.10.89:27017/data"); // connect to our database
