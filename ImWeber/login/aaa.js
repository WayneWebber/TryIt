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

/*****/
var Account     = mongoose.model( 'account' );
var users = [
	  { id: 1, username: 'bob', password: 'secret', email: 'bob@example.com' }
  , { id: 2, username: 'joe', password: 'birthday', email: 'joe@example.com' }
  , { id: 3, username: 'aa', password: 'aaa', email: 'aaa' }
];
// for (var a in users){
// 	new Account({
// 		nid					: users[a].id,
// 		username    : users[a].username,
// 	  password    : users[a].password,
// 	  email    : users[a].email,
// 		updated_at : Date.now()
// 	}).save( function( err, todo, count ){
// 		console.log('ok');
// 	});	
// }


Account.find( function ( err, account, count ){
  console.dir(account)
});