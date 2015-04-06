angular
  .module('anecdotals')
  .factory('portalFactory', portalFactory);

function portalFactory($http, BASE_URL) {
  'use strict';

  return {

    findOne: function(cb) {
      var fb = new Firebase('https://504-anecdotals.firebaseio.com');
      var user = fb.getAuth();
      console.log(user);

      $http
        .get(BASE_URL + '/teachers/' + user.uid + '.json')
        .success(function(data) {
          cb(data);
          console.log(data);
        });
    }
  };
}
