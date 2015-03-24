angular
  .module('anecdotals')
  .factory('testFactory', testFactory);

function testFactory($http, BASE_URL) {
  'use strict';
  return {

    updateStudentTime: function(id, data, cb) {
      var fb = new Firebase('https://504-anecdotals.firebaseio.com');
      var user = fb.getAuth();

      var url = BASE_URL + '/teachers/' + user.uid + '/tests/' + id + '/studentTimes.json';

    },

    update: function (id, data, cb) {
      var fb = new Firebase('https://504-anecdotals.firebaseio.com');
      var user = fb.getAuth();

      var url = BASE_URL + '/teachers/' + user.uid + '/tests/' + id + '.json';

      $http
        .put(url, data)
        .success(function (res) {
          if (typeof cb === 'function') {
            cb(res);
          }
        });
    },

    findOne: function (id, cb) {
      console.log(id);
      var fb = new Firebase('https://504-anecdotals.firebaseio.com');
      var user = fb.getAuth();
      console.log(user);

      $http
        .get(BASE_URL + '/teachers/' + user.uid + '/tests/' + id + '.json')
        .success(function (data) {
          cb(data);
          console.log(data);
        });
    },

    findAll: function(cb) {
      var fb = new Firebase('https://504-anecdotals.firebaseio.com');
      var user = fb.getAuth();

      $http
      .get('https://504-anecdotals.firebaseio.com/teachers/' + user.uid + '/testIds.json')
      .success(function(tests) {
        var array = [];

        if (tests) {
          $.each(tests, function(key, value) {
            $http
              .get('https://504-anecdotals.firebaseio.com/teachers/' + user.uid + '/tests/' + value + '.json')
              .success(function(data) {
                array.push(data);
                cb(array);
              });

          });
        }

      });

    },

    findAllTests: function(id, cb) {
      var fb = new Firebase('https://504-anecdotals.firebaseio.com');
      var user = fb.getAuth();

      $http
      .get('https://504-anecdotals.firebaseio.com/teachers/' + user.uid + '/tests/' + id + '/classes.json')
      .success(function(tests) {
        var array = [];

        if (tests) {
          $.each(tests, function(key, value) {
            $http
              .get('https://504-anecdotals.firebaseio.com/teachers/' + user.uid + '/tests/' + value + '.json')
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
















// angular
//   .module('anecdotals')
//   .factory('testFactory', testFactory);
//
// function testFactory($http, BASE_URL) {
//   'use strict';
//   var tests = [];
//
//   tests.findAll = function(cb) {
//
//       var fb = new Firebase('https://504-anecdotals.firebaseio.com');
//       var user = fb.getAuth();
//
//       $http
//       .get('https://504-anecdotals.firebaseio.com/teachers/' + user.uid + '/testIds.json')
//       .success(function(tests) {
//         var array = [];
//
//         if (tests) {
//           $.each(tests, function(key, value) {
//             $http
//               .get('https://504-anecdotals.firebaseio.com/teachers/' + user.uid + '/tests/' + value + '.json')
//               .success(function(data) {
//                 array.push(data);
//                 cb(array);
//               });
//
//           });
//         }
//
//       });
//
//     };
//   //   var fb = new Firebase('https://504-anecdotals.firebaseio.com');
//   //   var user = fb.getAuth();
//   //
//   //   $.getJSON('https://504-anecdotals.firebaseio.com/teachers/' + user.uid + '/tests.json', function(data) {
//   //     if (data) {
//   //       $.each(data, function(key, value) {
//   //         $http
//   //           .get('https://504-anecdotals.firebaseio.com/tests/' + value + '.json')
//   //           .success(function(data) {
//   //             tests.push(data);
//   //             cb(tests);
//   //           });
//   //
//   //       });
//   //     }
//   //
//   //   });
//   //
//   // };
//   console.log(tests);
//   return tests;
// }
