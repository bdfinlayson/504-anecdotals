angular
  .module('anecdotals')
  .controller('AuthController', AuthController);

function AuthController($rootScope, $scope, $location, authFactory, BASE_URL) {
	'use strict';

	var vm = this;

	vm.user = {};

  vm.login = function () {
    authFactory.login(vm.user, function (err, authData) {
      if (err) {
        console.log('Error logging in user:', err);
      } else {
        console.log('Logged in successfully', authData);
        $rootScope.user = authData;
        $location.path('/portal');
        $scope.$apply();
        //vm.initializeUser();
      }
    });
  };

  vm.register = function () {
    console.log('The register function was fired');
    authFactory.register(vm.user, function (err, authData) {
    console.log(err, authData);
    console.log('User info from AuthController.register', vm.user);
      if (err && err.code === 'EMAIL_TAKEN') {
        console.log('Error creating user:', err);
        vm.login();
      } else if (err) {
        console.log('Error creating user:', err);
      } else {
        console.log('User created successfully', authData);
        vm.login();
      }
    });
  };

  vm.forgotPassword = function () {
    authFactory.forgotPassword(vm.user, function (err) {
      if (err) {
        console.log('Error resetting password:', err);
      } else {
        console.log('Password reset email sent successfully');
      }
    });
  };

  vm.initializeUser = function (data) {

    authFactory.initializeUserToFb( function (data) {
      console.log('User initialized in FB!', data);
    });
  };
}
