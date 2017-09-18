App.controller('InputController',  ['$scope', '$log', '$http', '$window', '$mdSidenav', "$mdDialog", "$mdMedia", 'ClientService',function($scope, $log, $http, $window, $mdSidenav, $mdDialog, $mdMedia, ClientService) {
  var service = ClientService;
  this.myDate = new Date();
  this.isOpen = false;
  $scope.allTypes = []


      var taskNumber = 0
  $scope.allTasks=[];
  $scope.taskAdd=function(){
    if(inArrayTest($scope.taskType,$scope.allTypes)<1){
      $scope.allTypes.push({type:$scope.taskType, weight:0});
    }
    $scope.taskDeadlineDate = dateTimeMerger($scope.taskDeadlineTime,$scope.taskDeadlineDate)
    $scope.allTasks.push({taskName:$scope.taskName,
      taskType:$scope.taskType,
      taskValue:$scope.taskValue,
      taskDeadlineTime:$scope.taskDeadlineTime,
      taskDeadlineDate:$scope.taskDeadlineDate,
      taskNumber:taskNumber,
      allOthers: createAllOthers($scope.allTasks,$scope.taskName),
      preReqs:[]
    });
    taskNumber++
    addAllOthers($scope.allTasks,$scope.taskName)
    $scope.taskName = "";
    $scope.taskType = "";
    $scope.taskValue = "";
    $scope.taskDeadlineTime = "";
    $scope.taskDeadlineTime = "";
    $scope.taskDeadlineDate = "";
    $scope.allPossible = permutator($scope.allTasks);
    console.log($scope.allPossible, "ass")

  }
  $scope.removeCurrent=function(x){
    for(var i=$scope.allTasks.length-1;i>=0;i--){
      if($scope.allTasks[i].taskName===x){
        $scope.allTasks.splice(i,1)
      }
    }
  }

  $scope.removeOthers= function(x){
    for(var i=0;i<$scope.allTasks.length;i++){
      $scope.allTasks[i].allOthers.splice($scope.allTasks[i].allOthers.indexOf(x),1)
    }
  }

  $scope.remove=function(x){
    $scope.removeCurrent(x);
    $scope.removeOthers(x);
  }

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


  var inArrayTest=function(e,f){
    var holdVal=0;
    for(var i = 0; i<f.length;i++){
      if(e==f[i].type){
        holdVal++
      }
    }
    return holdVal
  }

  function findWithAttr(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
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
        if($scope.allTypes[i].weight>0){
          $scope.allTypes[i].weight--;
        }
      }
    }
  }

  var dateTimeMerger = function(time,date){
    var holdTime = time.toString()
    var timeRegex = new RegExp(/[0-1][0-9]\:[0-1][0-9]\:[0-1][0-9]/)
    var newTime = timeRegex.exec(holdTime)[0]
    var actDate = date.toString().replace(/[0-1][0-9]\:[0-1][0-9]\:[0-1][0-9]/,newTime)
    return actDate
  }

  $scope.toggle = function (item, list) {
      var idx = list.indexOf(item);
      if (idx > -1) {
        list.splice(idx, 1);
      }
      else {
        list.push(item);
      }
      console.log(list)
    };

    function permutator(inputArr) {
    var results = [];

    function permute(arr, memo) {
      var cur, memo = memo || [];

      for (var i = 0; i < arr.length; i++) {
        cur = arr.splice(i, 1);
        if (arr.length === 0) {
          results.push(memo.concat(cur));
        }
        permute(arr.slice(), memo.concat(cur));
        arr.splice(i, 0, cur[0]);
      }

      return results;
    }

    return permute(inputArr);
  }

  var preReqOrderRemove = function(allTasks){
    for(var i=1; i<allTasks.length; i++){
      
    }
  }

}]);
