var	express = require('express') 
	,app = express()
	,server = require('http').createServer(app)
	,io = require('socket.io').listen(server);

server.listen(9478);


// route.js
var route = require('./app/route.js');

app.get('/', route.chat);

io.sockets.on('connection', function(socket){
	socket.on('addme', function(username){
		socket.username = username;
		socket.emit('chat', 'SERVER', 'You have connected');
		socket.broadcast.emit('chat', 'SERVER', username + ' is on deck');
	});

	socket.on('sendchat', function(data){
		io.sockets.emit('chat', socket.username, data);
	});

	socket.on('disconnect', function(){
		io.sockets.emit('chat', 'SERVER', socket.username + ' has left the building');
	});
});