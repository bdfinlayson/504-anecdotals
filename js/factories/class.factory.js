angular
  .module('anecdotals')
  .factory('classFactory', classFactory);

function classFactory($http, BASE_URL) {
  'use strict';

  return {

    update: function(id, data, cb) {
      var fb = new Firebase('https://504-anecdotals.firebaseio.com');
      var user = fb.getAuth();

      var url = BASE_URL + '/teachers/' + user.uid + '/classes/' + id + '.json';

      $http
        .put(url, data)
        .success(function(res) {
          if (typeof cb === 'function') {
            cb(res);
          }
        });
    },

    findOne: function(id, cb) {
      console.log(id)
      var fb = new Firebase('https://504-anecdotals.firebaseio.com');
      var user = fb.getAuth();
      console.log(user);

      $http
        .get(BASE_URL + '/teachers/' + user.uid + '/classes/' + id + '.json')
        .success(function(data) {
          cb(data);
          console.log(data);
        });
    },

    findAll: function(cb) {
      var fb = new Firebase('https://504-anecdotals.firebaseio.com');
      var user = fb.getAuth();

      $http
        .get('https://504-anecdotals.firebaseio.com/teachers/' + user.uid + '/classIds.json')
        .success(function(classes) {
          var array = [];

          if (classes) {
            $.each(classes, function(key, value) {
              $http
                .get('https://504-anecdotals.firebaseio.com/teachers/' + user.uid + '/classes/' + value + '.json')
                .success(function(data) {
                  array.push(data);
                  cb(array);
                });

            });
          }

        });
    },
    findAllStudents: function(id, cb) {
      var fb = new Firebase('https://504-anecdotals.firebaseio.com');
      var user = fb.getAuth();

      $http
        .get('https://504-anecdotals.firebaseio.com/teachers/' + user.uid + '/classes/' + id + '/studentInfo.json')
        .success(function(data) {
          // var array = [];
          //
          // if (students) {
          //   $.each(students, function(key, value) {
          //     $http
          //       .get('https://504-anecdotals.firebaseio.com/teachers/' + user.uid + '/students/' + value + '.json')
          //       .success(function(data) {
          //         array.push(data);
          cb(data);
        });

      // });
      // }

      // });
    }
  };
}
