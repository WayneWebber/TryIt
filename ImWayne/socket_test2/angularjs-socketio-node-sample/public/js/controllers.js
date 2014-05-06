'use strict';

/* Controllers */

function TodoCtrl($scope) {
  var socket = io.connect();
  socket.on('change', function(obj) {
    $scope.todos = obj;
    $scope.$apply();
    console.log($scope.todos)
  });

  $scope.addTodo = function() {
    $scope.todos.push({text:$scope.todoText, done:false, updated_at:Date.now(), id:Date.now()});
    $scope.todoText = '';
    socket.emit('change', $scope.todos);
    console.log($scope.todos)
  };

  $scope.remaining = function() {
    var count = 0;
    angular.forEach($scope.todos, function(todo) {
      count += todo.done ? 0 : 1;
    });
    return count;
  };

  $scope.archive = function() {
    var oldTodos = $scope.todos;
    $scope.todos = [];

    angular.forEach(oldTodos, function(todo) {
      if (!todo.done) $scope.todos.push(todo);
    });
    socket.emit('change', $scope.todos);
  };

  $scope.change = function() {
    var oldTodos = $scope.todos;
    $scope.todos = [];
    console.log($scope.todos)
    angular.forEach(oldTodos, function(todo) {

      if (!todo.done) {
        $scope.todos.push(todo);

        // window.location = '/';
        console.log(todo)
      }else{

        socket.emit('change2', todo);
      }
    });

  };
  $scope.edit = function(todo){
     todo.editing = true;

  };
  $scope.save = function(todo){
   todo.editing = false;
   todo.updated_at = Date.now();
   socket.emit('change3', todo);
   // window.location = '/';
  };
}
