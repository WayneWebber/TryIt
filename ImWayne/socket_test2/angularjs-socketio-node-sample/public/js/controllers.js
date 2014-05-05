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
    $scope.todos.push({text:$scope.todoText, done:false});
    $scope.todoText = '';
    socket.emit('change', $scope.todos);
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
    // console.log($scope.todos)
  };

  $scope.change = function() {
   var oldTodos = $scope.todos;
    // $scope.todos = [];

    angular.forEach(oldTodos, function(todo) {

      if (todo.done) {
        // $scope.todos.push(todo);
        // console.log(todo);
        // console.log(todo)
        socket.emit('change2', todo);
        // window.location = '/';
        console.log(todo)
      }
    });
    // console.log($scope.todos.length)
    // socket.emit('change2', todo);

    // console.log($scope.todos)
     // console.log($scope.todos[0]._id)
    // console.log('change status')
  };
}
