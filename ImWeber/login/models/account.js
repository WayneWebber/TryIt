var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;
 
var Account = new Schema({
		nid					: Number,
    username    : String,
    password    : String,
    email    : String,
    updated_at : Date
});
 
mongoose.model( 'account', Account );
mongoose.connect( 'mongodb://localhost/guestbook' );
