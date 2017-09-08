App.controller('InputController',  ['$scope', '$log', '$http', '$window', '$mdSidenav', "$mdDialog", "$mdMedia", 'ClientService',function($scope, $log, $http, $window, $mdSidenav, $mdDialog, $mdMedia, ClientService) {
  var service = ClientService;

  $scope.taskNumber = [1,2,3];

  $scope.task = {};

  // $scope.$watchCollection()
  $scope.crown = function(){console.log($scope.task.name)};


}]);
