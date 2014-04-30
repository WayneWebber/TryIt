var mongoose = require('mongoose');
var Todo     = mongoose.model('wn_Todo');

module.exports = function(app) {
  app.post('/create', function createTodo(req, res) {
    new Todo({
      content   : req.body.newItem,
      updated_at : Date.now()
    }).save( function(err, todo, count) {
        if(err) return next(err);
    });
    res.redirect('/');
  });
  // app.get('/', function index(req, res) {
  //   Todo.
  //   find().
  //   sort('-updated_at').
  //   exec(function (err, todos, count) {

  //     // console.log(todos)
  //     res.render('index', {
  //         title : 'Express Todo Example',
  //         todos : todos
  //       });
  //     // res.json(todos)
  //     // console.log(todos[2].content)
  //   });
  // });
  app.get('/ca', function index(req, res) {
    Todo.
    find().
    sort('-updated_at').
    exec(function (err, todos, count) {
      
      // console.log(todos)
      // res.render('index', {
      //   title : 'Express Todo Example',
      //     todos : todos
      //   });
      res.json(todos)
      // console.log(todos[2].content)
    });
  });
  app.del('/destroy/:id', function destoryTodo(req, res) {

    console.log(req.params.id)
    Todo.findById(req.params.id,function(err, todo){
        todo.remove( function (err, todo) {
            if(!err)
              res.json({ error: 'message' });
        });
    });
  });
  // app.get('/edit/:id', function editTodo(req, res) {
  //   Todo.
  //   find().
  //   sort('-updated_at').
  //   exec(function(err, todos) {
  //     res.render('edit', {
  //       title   : 'Express Todo Example',
  //       todos   : todos,
  //       current : req.params.id
  //     });
  //   });
  // });
  app.put('/update', function( req, res ){
      // console.log(req.body.content._id)
      Todo.findById(req.body.content._id,function(err, todo){
         // console.dir(req.body.content)
         todo.content = req.body.content.content;
         todo.updated_at = Date.now();
         todo.save(function(err, todo, count){
          if(err) return next(err);

         })
      })
    
  })
  // app.post('/update', function updateTodo(req, res) {
  //    Todo.findById(req.body.todoid, function(err, todo) {
  //       todo.content = req.body.content;
  //       todo.updated_at = Date.now();
  //       todo.save( function(err, todo, count) {
  //           if(err) return next(err);
  //           res.redirect('/');
  //       });
  //   });
  // });
};
