var App = angular.module("App", ['ngMaterial', 'ngMessages', 'ngRoute', 'googlechart']);

App.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider){

}]);

var AppAdmin = angular.module("AppAdmin", ['ngMaterial', 'ngMessages', 'ngRoute', 'md.data.table']);

AppAdmin.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider){
    $routeProvider.
        when("/admin", {
            templateUrl: "/views/admin.html",
            controller: "AdminController"
        }).
        when("/emailList", {
            templateUrl: "/views/partials/emailList.html",
            controller: "EmailController"
        }).
        when("/setVariables", {
            templateUrl: "/views/partials/setVariables.html",
            controller: "SetVariablesController"
        }).
        otherwise({
            redirectTo: '/emailList'
        });
}]);

var AppRegistration = angular.module("AppRegistration", ['ngMaterial', 'ngRoute']);

AppRegistration.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider){

}]);

var AppLogin = angular.module("AppLogin", ['ngMaterial', 'ngRoute']);

AppLogin.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider){

}]);
