App.controller('InputController',  ['$scope', '$log', '$http', '$window', '$mdSidenav', "$mdDialog", "$mdMedia", 'ClientService','smallFunctions',function($scope, $log, $http, $window, $mdSidenav, $mdDialog, $mdMedia, ClientService,smallFunctions) {

//initial inputs
  var service = ClientService;
  this.isOpen = false;
  $scope.allTypes = []
  var taskNumber = 0
  $scope.allTasks=[];

  //main function for adding a task
  $scope.taskAdd=function(){
    if(smallFunctions.inArrayTest($scope.taskType,$scope.allTypes)<1){
      $scope.allTypes.push({type:$scope.taskType, weight:0});
    }
    $scope.allTasks.push({taskName:$scope.taskName,
      taskType:$scope.taskType,
      taskValue:$scope.taskValue,
      taskNumber:taskNumber,
      allOthers: createAllOthers($scope.allTasks,$scope.taskName)
    });
    taskNumber++
    addAllOthers($scope.allTasks,$scope.taskName)
    $scope.taskName = "";
    $scope.taskType = "";
    $scope.taskValue = "";
  }


//REMOVES A TASK
$scope.remove=function(x){
  $scope.removeCurrent(x);
  $scope.removeOthers(x);
}
  //removes current
  $scope.removeCurrent=function(x){
    for(var i=$scope.allTasks.length-1;i>=0;i--){
      if($scope.allTasks[i].taskName===x){
        $scope.allTasks.splice(i,1)
      }
    }
  }
  //removes relational
  $scope.removeOthers= function(x){
    for(var i=0;i<$scope.allTasks.length;i++){
      $scope.allTasks[i].allOthers.splice($scope.allTasks[i].allOthers.indexOf(x),1)
    }
  }


  //creates relation of all others
  var createAllOthers=function(alltasks, currentTask){
    var holdArray = [];
    for(var i=0; i<alltasks.length;i++){
      if(alltasks[i].taskName!==currentTask.taskName){
        holdArray.push(alltasks[i].taskName)
      }
    }
    return holdArray
  }
  var addAllOthers = function(allTasks,currentName){
    for(var i=0; i<allTasks.length; i++){
      if(allTasks[i].taskName!==currentName){
        allTasks[i].allOthers.push(currentName)
      }

    }
  }

  //changes task weight
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
        if($scope.allTypes[i].weight>0){
          $scope.allTypes[i].weight--;
        }
      }
    }
  }

  $scope.runOrder = function(inputArray){
    var allOrders = smallFunctions.permutator(inputArray);
    var orderValues = []
    for(var i=0; i<allOrders.length;i++){
      var holdObject = {
        order:allOrders[i],
        ticketWeightValue : $scope.ticketWeightValue(allOrders[i]),
        typeWeightValue : 0
      }
      orderValues.push(holdObject)
    }

    for(i=0; i<orderValues.length; i++){
      orderValues[i].relativeValue = $scope.ticketPercentValue($scope.totalTaskValue(orderValues),orderValues[i])
    }
    console.log(orderValues)
    for(var i = 0; i<orderValues.length;i++){
      $scope.totalTypeValue(orderValues[i])
    }
  }

  $scope.ticketWeightValue = function(input){
    var totalValue=0;
    for(var i=0; i<input.length; i++){
      holdValue = input[i].taskValue/(i+1)
      totalValue = totalValue + holdValue
    }
    return totalValue
  }

$scope.totalTaskValue = function(inputArray){
  var holdValue=0;
  for(i=0;i<inputArray.length;i++){
    holdValue=holdValue+inputArray[i].ticketWeightValue
  }
  return holdValue
}

$scope.ticketPercentValue = function(totalValue, currentObject){
  var holdValue;
  for(i=0; currentObject.length;i++){
    currentObject.percentValue = currentObject[i].ticketWeightValue/totalValue
  }
  return currentObject.ticketWeightValue/totalValue
}

$scope.totalTypeValue = function(inputArray){
  var holdArray =[]
  for(var i = 0; i<inputArray.order.length; i++){
    holdArray.push(inputArray.order[i].taskType)
  }
  var count = 1;
  var countArray = []
  for(var i=1; i<holdArray.length;i++){
    if(holdArray[i]===holdArray[i-1]){
      count = count+1
      if(i===holdArray.length-1){
        countArray.push(count)
      }
    }else{
      countArray.push(count)
      count = 1
    }
  }
  var totalValue=0
  for(var i = 0; i<countArray.length;i++){
    totalValue = totalValue + Math.pow(2,countArray[i])
  }
  console.log(totalValue)
}


}]);
