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
      controller: function($scope, $location, studentFactory) {

        var data = [];

        studentFactory.findAll(function(students) {
          // console.log('from the student controller', students);
          $.each(students, function(key, value) {
            // console.log(value.times);
            data = value.times;
            data.sort();
            // console.log(data);
          });
          var x = d3.scale.linear()
            .domain([0, d3.max(data)])
            .range([0, 420]);

          d3.select(".chart")
            .selectAll("div")
            .data(data)
            .enter().append("div")
            .style("width", function(d) {
              return x(d) + "px";
            })
            .text(function(d) {
              return d;
            });
        });

      }
    };
  });
