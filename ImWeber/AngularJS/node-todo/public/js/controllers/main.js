angular.module('todoController', [])

  // inject the Todo service factory into our controller
  .controller('mainController', function($scope, $http, Todos, $timeout) {
    $scope.formData = {};
    $scope.loading = true;

    // GET =====================================================================
    // when landing on the page, get all todos and show them
    // use the service to get all the todos
    Todos.get()
      .success(function(data) {
        $scope.todos = data;
        $scope.loading = false;
      });

    // CREATE ==================================================================
    // when submitting the add form, send the text to the node API
    $scope.createTodo = function() {
      $scope.loading = true;

      // validate the formData to make sure that something is there
      // if form is empty, nothing will happen
      if ($scope.formData.text != undefined) {

        // call the create function from our service (returns a promise object)
        Todos.create($scope.formData)

          // if successful creation, call our get function to get all the new todos
          .success(function(data) {
            $scope.loading = false;
            $scope.formData = {}; // clear the form so our user is ready to enter another
            $scope.todos = data; // assign our new list of todos
          });
      }
    };

    // DELETE ==================================================================
    // delete a todo after checking it
    $scope.deleteTodo = function(id) {
      $scope.loading = true;

      Todos.delete(id)
        // if successful creation, call our get function to get all the new todos
        .success(function(data) {
          $scope.loading = false;
          $scope.todos = data; // assign our new list of todos
        });
    };

    // Date ---------------------------
        $scope.counter = 0;
        $scope.onTimeout = function(){
            $scope.counter++;
            $scope.aaa = new Date().getTime();
            mytimeout = $timeout($scope.onTimeout,1000);
        };
        var mytimeout = $timeout($scope.onTimeout,1000);

    //~ var counter = 0,a;
    //~ setInterval(function(){
        //~ $scope.aaa = new Date().getTime();
        //~ console.log($scope.aaa)
        //~ counter++;
    //~ }, 500);
    //~ console.log($scope.aaa)
  });
