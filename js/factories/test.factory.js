angular
  .module('anecdotals')
  .factory('testFactory', testFactory);

function testFactory($http, BASE_URL) {
  'use strict';
  return {

    updateStudentTime: function(pathId, student, cb) {
      var fb = new Firebase('https://504-anecdotals.firebaseio.com');
      var user = fb.getAuth();



      $.getJSON(BASE_URL + '/teachers/' + user.uid + '/tests/' + pathId + '.json', function (data) {
        console.log(data);
        var percentageOver = ((student.timeTaken / data.standardTime) * 100) - 100;
        console.log(percentageOver);


//update the test object with student time data
      fb.child('teachers').child(user.uid).child('tests').child(pathId).child('studentTimes').push({
        'firstName': student.firstName,
        'lastName': student.lastName,
        'timeTaken': student.timeTaken,
        'studentId': student.studentId,
        'percentageOver': percentageOver,
        'standardTime': data.standardTime

      });
//update the class object with student time data
      fb.child('teachers').child(user.uid).child('classes').child(data.classId).child('testTimes').push({
        'firstName': student.firstName,
        'lastName': student.lastName,
        'timeTaken': student.timeTaken,
        'studentId': student.studentId,
        'percentageOver': percentageOver,
        'standardTime': data.standardTime,
        'testName': data.name,
        'testId': data.testId
      });
//update the student object with the student time data
      fb.child('teachers').child(user.uid).child('students').child(student.studentId).child('testTimes').push({
        'timeTaken': student.timeTaken,
        'percentageOver': percentageOver,
        'standardTime': data.standardTime,
        'testName': data.name,
        'testId': data.testId
      });

    });

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

    },
    findAllTestsInClass: function(id, cb) {
      var fb = new Firebase('https://504-anecdotals.firebaseio.com');
      var user = fb.getAuth();
      console.log('findAllTestsInClass function fired!');
      console.log(id);

      $http
      .get('https://504-anecdotals.firebaseio.com/teachers/' + user.uid + '/classes/' + id + '/testInfo.json')
      .success(function(tests) {
        cb(tests);
        console.log(tests);

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
