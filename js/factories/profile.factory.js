angular
  .module('anecdotals')
  .factory('profileFactory', profileFactory);

function profileFactory($http, BASE_URL) {
  'use strict';
  var profiles = [];

  profiles.findAll = function(cb) {

    var fb = new Firebase('https://504-anecdotals.firebaseio.com');
    var user = fb.getAuth();
    $.getJSON('https://504-anecdotals.firebaseio.com/teachers/' + user.uid + '/profile.json', function(data) {
      console.log(data);
      $http
        .get('https://504-anecdotals.firebaseio.com/profiles/' + data + '.json')
        .success(function(data) {
          profiles.push(data);
          cb(profiles);
        });

    });

  };
  console.log(profiles);
  return profiles;
}
