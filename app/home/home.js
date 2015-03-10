'use strict';

angular.module('myApp.home', ['ngRoute','firebase'])

// Declared route
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'home/home.html',
        controller: 'HomeCtrl'
    });
}])

// Home controller
.controller('HomeCtrl', ['$scope','$firebaseSimpleLogin',function($scope, $firebaseSimpleLogin) {

 var firebaseObj = new Firebase("https://504-anecdotals.firebaseio.com");
 var loginObj = $firebaseSimpleLogin(firebaseObj);

}]);

$scope.SignIn = function($scope) {
 var username = $scope.user.email;
 var password = $scope.user.password;

 //auth logic will be here

};
