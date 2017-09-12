App.controller('InputController',  ['$scope', '$log', '$http', '$window', '$mdSidenav', "$mdDialog", "$mdMedia", 'ClientService',function($scope, $log, $http, $window, $mdSidenav, $mdDialog, $mdMedia, ClientService) {
  var service = ClientService;

  $scope.allTasks=[];
  $scope.taskAdd=function(){
    $scope.allTasks.push({taskName:$scope.taskName,taskType:$scope.taskType,taskValue:$scope.taskValue})
    $scope.taskName = "";
    $scope.taskType = "";
    $scope.taskValue = "";
  }
  $scope.remove=function(x){
    for(var i=$scope.allTasks.length-1;i>=0;i--){
      if($scope.allTasks[i].taskName===x){
        $scope.allTasks.splice(i,1)
      }
    }
  }

}]);
