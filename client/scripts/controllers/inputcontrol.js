App.controller('InputController',  ['$scope', '$log', '$http', '$window', '$mdSidenav', "$mdDialog", "$mdMedia", 'ClientService',function($scope, $log, $http, $window, $mdSidenav, $mdDialog, $mdMedia, ClientService) {
  var service = ClientService;

  $scope.allTasks=[];
  $scope.taskAdd=function(){
    $scope.allTasks.push({taskName:$scope.taskName,taskType:$scope.taskType,taskValue:$scope.taskValue,taskDue:$scope.taskDue})
    $scope.taskName = "";
    $scope.taskType = "";
    $scope.taskValue = "";
    $scope.taskDeadlineTime = "";
    $scope.taskDeadlineTime = "";
    $scope.taskDeadlineDate = "";
    $scope.allTypes = $scope.makeTaskTypes($scope.allTasks)
    console.log($scope.allTypes)
  }
  $scope.remove=function(x){
    for(var i=$scope.allTasks.length-1;i>=0;i--){
      if($scope.allTasks[i].taskName===x){
        $scope.allTasks.splice(i,1)
      }
    }
  }

  $scope.makeTaskTypes=function(e){
    var holdArray = []
    for(var i=0; i<e.length; i++){
      holdArray.push({type:e[i].taskType,weight:0})
    }
    return holdArray
  }


  $scope.weightUp = function(x){
    for(var i=$scope.allTasks.length-1;i>=0;i--){
      if($scope.allTypes[i]===x){
        $scope.allTypes[i].weight++;

     }
    }
  }

  $scope.weightDown = function(x){
    for(var i=$scope.allTasks.length-1;i>=0;i--){
      if($scope.allTypes[i]===x){
        $scope.allTypes[i].weight--;
        console.log("fuck you")
     }
    }
  }



}]);
