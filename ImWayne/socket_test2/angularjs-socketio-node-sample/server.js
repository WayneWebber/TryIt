require('./db');
var express = require('express');
var connect = require('connect'),
    socketio = require('socket.io');
var app = express();
// require('./route/route')(app);

var port = process.env.PORT || 3000;
var server = connect(
  connect.static(__dirname + '/public')
).listen(port);

// var data = [
//     {text:'learn sssangular', done:true},
//     {text:'build an angular app', done:false}];
// var data;

var io = socketio.listen(server);
io.sockets.on('connection', function(socket) {
  // mongo
  var mongoose = require('mongoose');
  var Todo     = mongoose.model('wn_Todo_socket');
  Todo.find(function(err, todo, count) {
    // data = todo;
    socket.emit('change', todo);
    console.log('step1')
  });
  //
  // socket.emit('change', data);

  socket.on('change', function(obj) {
    // mongo
    new Todo({
      text       : obj[obj.length-1].text,
      done       : obj[obj.length-1].done,
      updated_at : Date.now()
    }).save( function(err, todo, count) {
        if(err) return next(err);
        console.log('step2')
    });

    //
    console.log(obj);
    data = obj;
    socket.broadcast.emit('change', data);
  });
  socket.on('change2', function(obj) {
    console.log(obj._id);
    Todo.remove({_id:obj._id},function(err,docs){//删除id为4的记录

     // console.log(docs);
     // console.log('remove success');
     data = obj;
     console.log(data)
     socket.broadcast.emit('change', data);
     console.log('刪除success')
  });
    // console.log(obj);
    // data = obj;
    // socket.broadcast.emit('change', data);
  });
});
