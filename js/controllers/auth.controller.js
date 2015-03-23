angular
  .module('anecdotals')
  .controller('AuthController', AuthController);

function AuthController($http, $rootScope, $scope, $location, authFactory, BASE_URL) {
  'use strict';

  var vm = this;
  console.log('this is the this or vm in the authcontroller: ', vm);




  vm.user = {};

  vm.login = function() {
    authFactory.login(vm.user, function(err, authData) {
      if (err) {
        console.log('Error logging in user:', err);
      } else {
        console.log('Logged in successfully', authData);
        $rootScope.user = authData;
        clear();
        $location.path('/portal');
        $scope.$apply();
      }
    });
  };

  vm.register = function() {
    console.log('The register function was fired');

    authFactory.register(vm.user, function(err, authData) {
      console.log(err, authData);
      console.log('User info from AuthController.register', vm.user);
      if (err && err.code === 'EMAIL_TAKEN') {
        console.log('Error creating user:', err);
        //vm.login();
      } else if (err) {
        console.log('Error creating user:', err);
      } else {
        console.log('User created successfully', authData);
        var fb = new Firebase('https://504-anecdotals.firebaseio.com/');
        var profileId = fb.child('profiles').push({
          'teacherId': authData.uid,
          'email': vm.user.email,
          'password': vm.user.password,
          'firstName': vm.user.firstName,
          'lastName': vm.user.lastName,
          'schoolDistrict': vm.user.schoolDistrict,
          'zipCode': vm.user.zipCode
        }).key();

        fb.child('teachers').child(authData.uid).set({
          'id': authData.uid,
          'email': vm.user.email,
          'password': vm.user.password,
          'profile': profileId,
          'firstName': vm.user.firstName,
          'lastName': vm.user.lastName,
          'schoolDistrict': vm.user.schoolDistrict,
          'zipCode': vm.user.zipCode
        });
        console.log('these are the teacher and profile keys: ', profileId, vm.user.uid);
        vm.login();
        clear();
      }
    });
  };

  vm.forgotPassword = function() {
    authFactory.forgotPassword(vm.user, function(err) {
      if (err) {
        console.log('Error resetting password:', err);
      } else {
        console.log('Password reset email sent successfully');
        clear();
      }
    });
  };
  
  function clear() {
    $('input[type="text"]').val('');
    $('input[type="email"]').val('');
    $('input[type="password"]').val('');
    $('input[type="date"]').val('');
    $('input[type="number"]').val('');
    $('input[type="phone"]').val('');
  }
}
