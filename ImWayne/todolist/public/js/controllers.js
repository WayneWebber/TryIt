// function TodoCrtl($scope) {
//   $scope.newItem = '';
//   $scope.todoList = [];
//   $scope.addItem = function(){
//     if(this.newItem){
//        this.todoList.push({label:this.newItem});
//        this.newItem = '';
//     }
   
//   }
// } 
    
    
// function TodoCrtlRemovable($scope) {
//   $scope.newItem = '';
//   $scope.todoList = [];
//   $scope.addItem = function(){
//     if(this.newItem){
//        this.todoList.push({label:this.newItem,isFinish:false});
//        this.newItem = '';
//     }   
//   }   
      
//   $scope.removeItem = function(item){
//       // item.isFinish = true;
//       var index = $scope.todoList.indexOf(item)//
//       // console.log(index)
//       $scope.todoList.splice(index, 1);
//       console.dir($scope.todoList)
//   }       
// }       
      
 
function TodoCrtlUpdate($scope, $http) {
  $scope.newItem = '';
  $scope.todoList = [];
  $http.get('/ca')
    .success(function(data) {
      var timeconvert = data[0].updated_at;
      console.log(timeconvert)
      $scope.todoList = data;
      
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });

  $scope.addItem = function(){
    if(this.newItem){
       this.todoList.push({content:this.newItem,isFinish:false});
       // this.newItem = '';
    }else{
      this.newItem = null;
    }
  }
 
  $scope.removeItem = function(item){
      // item.isFinish = true;
      var index = $scope.todoList.indexOf(item);
      console.log(index)      
      var deleteitem =  $scope.todoList.splice(index, 1);
      console.dir(deleteitem[0]._id)
      $http.delete('/destroy/' + deleteitem[0]._id).success(function(data) {
        window.location = '/';
                });  
     
  }
 
  $scope.edit = function(item){
      item.editing = true;
  }
 
  $scope.save = function(item){
    // delete item.editing;
    item.editing = false;
    $http.put('/update', {content: item});
  }
 }