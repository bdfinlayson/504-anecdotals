angular
  .module('anecdotals')
  .factory('classFactory', classFactory);

function classFactory($http, BASE_URL) {
  'use strict';
  var classes = [];

  classes.findAll = function(cb) {

    var fb = new Firebase('https://504-anecdotals.firebaseio.com');
    var user = fb.getAuth();
    $.getJSON('https://504-anecdotals.firebaseio.com/teachers/' + user.uid + '/classes.json', function(data) {
      if (data) {
        $.each(data, function(key, value) {
          $http
            .get('https://504-anecdotals.firebaseio.com/classes/' + value + '.json')
            .success(function(data) {
              classes.push(data);
              cb(classes);
            });

        });
      }

    });

  };
  console.log(classes);
  return classes;
}
