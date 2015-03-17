angular
  .module('anecdotals')
  .factory('authFactory', authFactory);

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
      //register user on firebase
      console.log('Data from the register factory:', user);
      var fb = new Firebase(BASE_URL);

      fb.createUser(user, cb);

      //make id for new user
      //idFactory(user);

      // sendToFb(user);

      // function sendToFb(user) {
      //   console.log('Data in the send to Fb function', user);
      //   fb.authWithPassword(user, function(error, authData) {
      //      if (error) {
      //   console.log("Login Failed!", error);
      //   } else {
      //   console.log("Authenticated successfully with payload:", authData);

      //     fb.child('users').child(authData.uid).set({
      //       'email': authData.password.email,
      //       'userId': authData.uid,
      //       'expires': authData.expires,
      //       'token': authData.token
      //       });

      //   //    $http
      //   //      .post(BASE_URL + '/users/' + authData.uid + '.json', {
      //   //         'email': authData.password.email,
      //   //         'userId': authData.uid,
      //   //         'expires': authData.expires,
      //   //         'token': authData.token
      //   //         })
      //   //      .success(function () {
      //   //      console.log('You posted a new user to firebase with the following data: ', authData);
      //   // });


      //     // fb.child('users').child(authData.token).set({
      //     //   userName: authData.uid
      //     // });
      //     console.log('attempted to send user to fb');
      //   }
      //   });
      //   //var data = fb.getAuth();
      //   //console.log('What is data at this point?', data)
      // }
    },

    forgotPassword: function (user, cb) {
      var fb = new Firebase(BASE_URL);

      fb.resetPassword(user, cb);
    },
    // makeNewFbUser: function (authData, user) {
    //   console.log('MakeNewFbUser data sent from the controller: ', authdata, user);
    // }
  };
}




    // initializeUserToFb: function () {
    //   var authData = $rootScope.user;
    //   // console.log('Info from initializeUserToFb', authData)
    //   // var fbUser = new Firebase(BASE_URL + '/users/' + authData.uid);
    //   // fbUser.set(authData);
    //   $http
    //     .post(BASE_URL + '/users.json', authData)
    //     .success(function () {
    //       console.log('You posted a new user to firebase with the following data: ', authData);
    //   });
    // }

