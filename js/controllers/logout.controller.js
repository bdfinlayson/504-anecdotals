angular
  .module('anecdotals')
  .controller('LogoutController', LogoutController);

function LogoutController($rootScope, $scope, $location, authFactory) {
  'use strict';
  authFactory.logout(function () {
    delete $rootScope.user;
    console.log('you have been logged out!')
    $location.path('/login');
    $scope.$apply();
  });
}
