AppAdmin.controller('AdminController',  ['$scope', '$http', '$window','AdminService',function($scope, $http, $window, AdminService) {
  $scope.toEmailList = function(){
    $window.location.href = '#emailList';
  };
  $scope.toDefaultValues = function(){
    $window.location.href = '#setVariables';
  };

}]);


AppAdmin.controller('EmailController',  ['$scope', '$http', '$window','AdminService', '$mdDialog',function($scope, $http, $window, AdminService, $mdDialog) {
  'use strict';

  $scope.selected = [];
  $scope.limitOptions = [5, 10, 15];

  $scope.query = {
    order: 'date',
    limit: 5,
    page: 1
  };

$scope.getContacts = function(){
  $http.get("/submit").then(function(response){
      $scope.emailList = response.data;
      console.log($scope.emailList);
      $scope.count = $scope.emailList.length;
  });
};
$scope.getContacts();


$scope.toggleLimitOptions = function () {
  $scope.limitOptions = $scope.limitOptions ? undefined : [5, 10, 15];
};

$scope.loadStuff = function () {
  $scope.promise = $timeout(function () {
  }, 2000);
};

$scope.logItem = function (item) {
  console.log(item.name, 'was selected');
};

$scope.logOrder = function (order) {
  console.log('order: ', order);
};

$scope.logPagination = function (page, limit) {
  console.log('page: ', page);
  console.log('limit: ', limit);
};

$scope.changeStatus = function(id){
  console.log("Changing status of contact with id: ", id);
};

$scope.deleteContact = function(id) {
    var confirm = $mdDialog.confirm()
          .title('Are you sure you want to delete this contact?')
          .ok('Yes')
          .cancel('No');
    $mdDialog.show(confirm).then(function() {
      console.log("Yes");
      AdminService.deleteTheContact(id);
      $scope.getContacts();
    }, function() {
      console.log("No");
    });
  };

$scope.changeStatus = function(id) {
    var confirm = $mdDialog.confirm()
          .title('Are you sure you want to mark contact as "Contacted"?')
          .ok('Yes')
          .cancel('No');
    $mdDialog.show(confirm).then(function() {
      console.log("Yes");
      AdminService.updateTheContact(id);
      $scope.getContacts();
    }, function() {
      console.log("No");
    });
  };
  $scope.changeStatusBack = function(id) {
      var confirm = $mdDialog.confirm()
            .title('Are you sure you want to mark contact as "Not Contacted"?')
            .ok('Yes')
            .cancel('No');
      $mdDialog.show(confirm).then(function() {
        console.log("Yes");
        AdminService.updateTheContactBack(id);
        $scope.getContacts();
      }, function() {
        console.log("No");
      });
    };


}]);


AppAdmin.controller('SetVariablesController',  ['$scope', '$http', '$window','AdminService',function($scope, $http, $window, AdminService) {
  var adminService = AdminService;

$scope.getDefaults = function() {
  $http.get("/defaults").then(function(response){
      $scope.defaultVariables = response.data[0];
      AdminService.admin.defaults = $scope.defaultVariables;
  });
};

$scope.getDefaults();

  $scope.setDefaultValues = function(defaultVariables){
    AdminService.alterDefaults(defaultVariables);
  };


}]);
