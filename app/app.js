'use strict';

angular.module('myApp', [
  'ngRoute',
  'myApp.home'  //newly addded home module
]).config(['$routeProvider', function($routeProvider) {
  //routes will be here
  //set default view of app to home
  $routeProvider.otherwise({
    redirectTo: '/home'
  });
}]);


