angular
  .module('anecdotals')
  .factory('infoFactory', infoFactory);


function infoFactory($http, BASE_URL, $location) {
  'use strict';

  return {


    findOneClass: function(cb) {
      console.log('infoFactory function findOneClass fired!');
      var fb = new Firebase('https://504-anecdotals.firebaseio.com');
      var user = fb.getAuth();
      console.log(user);
      var path = $location.$$path;
      var pathId = path.slice(14);
      console.log(pathId);

      $http
        .get(BASE_URL + '/teachers/' + user.uid + '/classes/' + pathId + '.json')
        .success(function(data) {
          cb(data);
          console.log(data);
        });
    },

    findOneStudent: function(cb) {
      console.log('infoFactory function findOneStudent fired!');
      var fb = new Firebase('https://504-anecdotals.firebaseio.com');
      var user = fb.getAuth();
      console.log(user);
      var path = $location.$$path;
      var pathId = path.slice(15);
      console.log(pathId);

      $http
        .get(BASE_URL + '/teachers/' + user.uid + '/students/' + pathId + '.json')
        .success(function(data) {
          cb(data);
          console.log(data);
        });
    },
    findOneTest: function(cb) {
      console.log('infoFactory function findOneTest fired!');
      var fb = new Firebase('https://504-anecdotals.firebaseio.com');
      var user = fb.getAuth();
      console.log(user);
      var path = $location.$$path;
      var pathId = path.slice(12);
      console.log(pathId);

      $http
        .get(BASE_URL + '/teachers/' + user.uid + '/tests/' + pathId + '.json')
        .success(function(data) {
          cb(data);
          console.log(data);
        });
    },
    findStudentTests: function(cb) {
      console.log('infoFactory function findOneStudent fired!');
      var fb = new Firebase('https://504-anecdotals.firebaseio.com');
      var user = fb.getAuth();
      console.log(user);
      var path = $location.$$path;
      var pathId = path.slice(15);
      console.log(pathId);

      $http
        .get(BASE_URL + '/teachers/' + user.uid + '/students/' + pathId + '.json')
        .success(function(data) {

          var info = [];

          var testName = [];
          var timeTaken = [];
          var standardTime = [];

          console.log('from the infoFactory findOneStudent function', data.testTimes);
          $.each(data.testTimes, function(key, value) {
            // console.log(value.times);
            data = value;
            console.log(data.timeTaken);
            console.log(data.testName);
            console.log(data.standardTime);

            testName.push(data.testName);
            timeTaken.push(data.timeTaken);
            standardTime.push(data.standardTime);

            console.log(testName, timeTaken, standardTime);




            console.log(testName, timeTaken, standardTime);



            data = {
              labels: testName,
              series: [{
                label: 'Time Taken',
                values: timeTaken
              }, {
                label: 'Standard Time',
                values: standardTime
              } ]
            };



          // cb(data);
          // console.log(data);
        });
        cb(data);
        console.log(data);
      });
    }
  };
}
