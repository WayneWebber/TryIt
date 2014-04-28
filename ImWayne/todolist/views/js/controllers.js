function TodoCrtl($scope) {
  $scope.newItem = '';
  $scope.todoList = [];
  $scope.addItem = function(){
    if(this.newItem){
       this.todoList.push({label:this.newItem});
       this.newItem = '';
    }
   
  }
} 
    
    
function TodoCrtlRemovable($scope) {
  $scope.newItem = '';
  $scope.todoList = [];
  $scope.addItem = function(){
    if(this.newItem){
       this.todoList.push({label:this.newItem,isFinish:false});
       this.newItem = '';
    }   
  }   
      
  $scope.removeItem = function(item){
      // item.isFinish = true;
      var index = $scope.todoList.indexOf(item)//
      // console.log(index)
      $scope.todoList.splice(index, 1);
      console.dir($scope.todoList)
  }       
}       
      
 
function TodoCrtlUpdate($scope) {
  $scope.newItem = '';
  $scope.todoList = [];

  $scope.addItem = function(){
    if(this.newItem){
       this.todoList.push({label:this.newItem,isFinish:false});
       this.newItem = '';
    } 
  }
 
  $scope.removeItem = function(item){
      item.isFinish = true;
      
  }
 
 
  $scope.edit = function(item){
      item.editing = true;
  }
 
  $scope.save = function(item){
    delete item.editing;
  }
 }