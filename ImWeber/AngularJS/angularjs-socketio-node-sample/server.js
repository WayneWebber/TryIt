var connect = require('connect'),
    socketio = require('socket.io');

var port = process.env.PORT || 3000;
var server = connect(
  connect.static(__dirname + '/public')
).listen(port);

var data = [
    {text:'learn angular', done:true},
    {text:'learn angular', done:true},
    {text:'learn angular', done:true},
    {text:'learn angular', done:true},
    {text:'build an angular app', done:false}];

var io = socketio.listen(server);

/***資料庫****/
var mongoose = require('mongoose');
var database = require('./config/database');

/***/
io.sockets.on('connection', function(socket) {

  socket.emit('change', data);

  socket.on('change', function(obj) {
    console.log(obj);
    data = obj;
    socket.broadcast.emit('change', data);
  });
});
