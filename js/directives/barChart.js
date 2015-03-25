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

          var data = [];

          infoFactory.findOneStudent(function(students) {
            // console.log('from the student controller', students);
            $.each(students, function(key, value) {
              // console.log(value.times);
              data = value.times;
              data.sort();
              // console.log(data);
            }); //closes $.each
          });


              }
            };
          });
