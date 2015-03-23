angular
  .module('anecdotals')
  .factory('studentFactory', studentFactory);

function studentFactory($http, BASE_URL) {
  'use strict';
  return {

    update: function (id, data, cb) {
      var fb = new Firebase('https://504-anecdotals.firebaseio.com');
      var user = fb.getAuth();

      var url = BASE_URL + '/teachers/' + user.uid + '/students/' + id + '.json';

      $http
        .put(url, data)
        .success(function (res) {
          if (typeof cb === 'function') {
            cb(res);
          }
        });
    },

    findOne: function (id, cb) {
      console.log(id)
      var fb = new Firebase('https://504-anecdotals.firebaseio.com');
      var user = fb.getAuth();
      console.log(user);

      $http
        .get(BASE_URL + '/teachers/' + user.uid + '/students/' + id + '.json')
        .success(function (data) {
          cb(data);
          console.log(data);
        });
    },

    findAll: function(cb) {
      var fb = new Firebase('https://504-anecdotals.firebaseio.com');
      var user = fb.getAuth();

      $http
      .get('https://504-anecdotals.firebaseio.com/teachers/' + user.uid + '/studentIds.json')
      .success(function(students) {
        var array = [];

        if (students) {
          $.each(students, function(key, value) {
            $http
              .get('https://504-anecdotals.firebaseio.com/teachers/' + user.uid + '/students/' + value + '.json')
              .success(function(data) {
                array.push(data);
                cb(array);
              });

          });
        }

      });

    }



  };
}
