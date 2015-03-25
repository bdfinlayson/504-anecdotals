angular
  .module('anecdotals.directives.barChart', [])
  .directive('barChart', function() {
    'use strict';
    return {
      restrict: 'EA',
      scope: {
        data: '='
      },
      templateUrl: 'js/templates/bar-chart.html',
      controller: function($scope, $location, studentFactory, infoFactory) {

        var info = [];

        var testName = [];
        var timeTaken = [];
        var standardTime = [];

        infoFactory.findOneStudent(function(students) {
          console.log('from the infoFactory findOneStudent function', students.testTimes);
          $.each(students.testTimes, function(key, value) {
            // console.log(value.times);
            info = value;
            console.log(info.timeTaken);
            console.log(info.testName);
            console.log(info.standardTime);

            testName.push(info.testName);
            timeTaken.push(info.timeTaken);
            standardTime.push(info.standardTime);

            console.log(testName, timeTaken, standardTime);




        console.log(testName, timeTaken, standardTime);

        var data = {
          labels: [
            'resilience', 'maintainability', 'accessibility',
            'uptime', 'functionality', 'impact'
          ],
          series: [{
            label: 'Time Taken',
            values: timeTaken
          }, {
            label: 'Standard Time',
            values: standardTime
          }, {
            label: '2014',
            values: [31, 28, 14, 8, 15, 21]
          }, ]
        };


      }); 
    });



      }
    };
  });
