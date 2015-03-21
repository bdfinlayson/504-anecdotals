angular
  .module('anecdotals')
  .factory('testFactory', testFactory);

function testFactory($http, BASE_URL) {
  'use strict';
  var tests = [];

  tests.findAll = function(cb) {

    var fb = new Firebase('https://504-anecdotals.firebaseio.com');
    var user = fb.getAuth();
    $.getJSON('https://504-anecdotals.firebaseio.com/teachers/' + user.uid + '/tests.json', function(data) {
      if (data) {
        $.each(data, function(key, value) {
          $http
            .get('https://504-anecdotals.firebaseio.com/tests/' + value + '.json')
            .success(function(data) {
              tests.push(data);
              cb(tests);
            });

        });
      }

    });

  };
  console.log(tests);
  return tests;
}
