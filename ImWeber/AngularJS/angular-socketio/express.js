var express = require('express')
	,app = express()
	,server = require('http').createServer(app);
var port = process.env.PORT || 3000;
var socketio = require('socket.io');
var io = socketio.listen(server);

app.use(express.static(__dirname + '/public'));

server.listen(port);
console.log( port + ' is start!!' );

var data = [
    {text:'learn angular', done:true},
    {text:'build an angular app', done:false}];

io.sockets.on('connection', function(socket) {

  socket.emit('change', data);

  socket.on('change', function(obj) {
    console.log(obj);
    data = obj;
    socket.broadcast.emit('change', data);
  });
});

