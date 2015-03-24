angular
  .module('anecdotals')
  .factory('classFactory', classFactory);

function classFactory($http, BASE_URL) {
  'use strict';

  return {

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
    }
  };
}
