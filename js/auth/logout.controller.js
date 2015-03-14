angular
  .module('anecdotals')
  .controller('LogoutController', LogoutController);

function LogoutController($rootScope, $scope, $location, authFactory) {
  'use strict';
  authFactory.logout(function () {
    delete $rootScope.user;
    $location.path('/login');
    $scope.$apply();
  });
}
