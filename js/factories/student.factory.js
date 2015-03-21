angular
  .module('anecdotals')
  .factory('studentFactory', studentFactory);

function studentFactory($http, BASE_URL) {
  'use strict';
  var students = [];

  students.findAll = function(cb) {

    var fb = new Firebase('https://504-anecdotals.firebaseio.com');
    var user = fb.getAuth();
    $.getJSON('https://504-anecdotals.firebaseio.com/teachers/' + user.uid + '/students.json', function(data) {
      if (data) {
        $.each(data, function(key, value) {
          $http
            .get('https://504-anecdotals.firebaseio.com/students/' + value + '.json')
            .success(function(data) {
              students.push(data);
              cb(students);
            });

        });
      }

    });

  };
  console.log(students);
  return students;
}
