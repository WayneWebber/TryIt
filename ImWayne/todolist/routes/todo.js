var mongoose = require('mongoose');
var Todo     = mongoose.model('Todo');

module.exports = function(app) {
  app.post('/create', function createTodo(req, res) {
    new Todo({
        content   : req.body.content,
        updated_at : Date.now()
    }).save( function(err, todo, count) {
        res.redirect('/');
    });
  });
  app.get('/', function index(req, res) {
    Todo.
    find().
    sort('-updated_at').
    exec(function (err, todos, count) {
      res.render('index', {
        title : 'Express Todo Example',
          todos : todos
        });
    });
  });
  app.get('/destroy/:id', function destoryTodo(req, res) {
    Todo.findById( req.params.id, function( err, todo) {
        todo.remove( function (err, todo) {
            res.redirect('/');
        });
    });
  });
  app.get('/edit/:id', function editTodo(req, res) {
    Todo.
    find().
    sort('-updated_at').
    exec(function(err, todos) {
      res.render('edit', {
        title   : 'Express Todo Example',
        todos   : todos,
        current : req.params.id
      });
    });
  });
  app.post('/update', function updateTodo(req, res) {
     Todo.findById(req.body.todoid, function(err, todo) {
        todo.content = req.body.content;
        todo.updated_at = Date.now();
        todo.save( function(err, todo, count) {
            if(err) return next(err);
            res.redirect('/');
        });
    });
  });
};
