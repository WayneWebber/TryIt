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


var io = socketio.listen(server);
io.sockets.on('connection', function(socket) {
  // mongo
  var mongoose = require('mongoose');
  var Todo     = mongoose.model('wn_Todo_socket');
  Todo.find().sort('-updated_at').
    exec(function(err, todo, count) {

    socket.emit('change', todo);
    console.log('step1')
  });
  //

  socket.on('change', function(obj) {
    // mongo
    new Todo({
      text       : obj[obj.length-1].text,
      done       : obj[obj.length-1].done,
      updated_at : obj[obj.length-1].updated_at,
      id         : obj[obj.length-1].id
      // updated_at : Date.now()
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
    console.log(obj.updated_at);
    Todo.remove({updated_at:obj.updated_at},function(err,docs){//删除id为4的记录
    // Todo.remove({_id:obj._id},function(err,docs){//删除id为4的记录
     data = obj;
     console.log('刪除success')
  });
      Todo.find().sort('-updated_at').
    exec(function(err, todo, count) {
    // data = todo;
   socket.broadcast.emit('change', todo);
    console.log('step3')
  });

  });
  socket.on('change3', function(obj) {
      console.log(obj);
      Todo.find({id:obj.id} ,function(err, todo, count) {
      // Todo.find({_id:obj._id} ,function(err, todo, count) {

      todo[0].text = obj.text;
      todo[0].updated_at = obj.updated_at;
      todo[0].save(function(err, todo, count){
          if(err) return next(err);
          Todo.find().sort('-updated_at').
    exec(function(err, todo, count) {
    // data = todo;
   socket.broadcast.emit('change', todo);
    console.log('修改success')
  });
         });

      console.log(todo[0].text);
      console.log(obj.text);
  });

  });
});
