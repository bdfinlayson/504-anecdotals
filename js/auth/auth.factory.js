angular
  .module('anecdotals')
  .factory('authFactory', authFactory)

function authFactory($rootScope, $http, BASE_URL) {
  'use strict';

  return {
    isLoggedIn: function () {
      var fb = new Firebase(BASE_URL);

      return !!fb.getAuth();
    },

    getAuth: function () {
      var fb = new Firebase(BASE_URL);

      return fb.getAuth();
    },

    login: function (user, cb) {
      var fb = new Firebase(BASE_URL);

      fb.authWithPassword(user, cb);
    },

    logout: function (cb) {
      var fb = new Firebase(BASE_URL);

      fb.unauth(cb);
    },

    register: function (user, cb) {
      var fb = new Firebase(BASE_URL);

      fb.createUser(user, cb);
    },

    forgotPassword: function (user, cb) {
      var fb = new Firebase(BASE_URL);

      fb.resetPassword(user, cb);
    },
    initializeUserToFb: function () {
      var authData = $rootScope.user;
      // console.log('Info from initializeUserToFb', authData)
      // var fbUser = new Firebase(BASE_URL + '/users/' + authData.uid);
      // fbUser.set(authData);
      $http
        .post(BASE_URL + '/users.json', authData)
        .success(function () {
          console.log('You posted a new user to firebase with the following data: ', authData);
      });
    }
  };
}
