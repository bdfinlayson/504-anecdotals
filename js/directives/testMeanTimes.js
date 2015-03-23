angular
  .module('anecdotals.directives.testMeanTimes', [])
  .directive('testMeanTimes', function() {
    'use strict';
    return {
      restrict: 'EA',
      scope: {
        data: '='
      },
      templateUrl: 'js/templates/test-mean-times.html',
      controller: function(testFactory) {
        console.log('mean test time controller fired')

        var data = [];
        var names = [];
        var times = [];

        var margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 40
          },
          width = 960 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;

        var x = d3.scale.ordinal()
          .rangeRoundBands([0, width], 0.1);

        var y = d3.scale.linear()
          .range([height, 0]);

        var xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom");

        var yAxis = d3.svg.axis()
          .scale(y)
          .orient("left")
          .ticks(10, "");

        var svg = d3.select("div").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // testFactory.findAll(function(tests) {
        //   console.log('from the test controller', tests);
        //   $.each(tests, function(key, value) {
        //     console.log(value.studentTimes);
        //     data = value.studentTimes;
        //     // data.sort();
        //     console.log(data)
        //     $.each(data, function(key, value) {
        //       console.log(key, value);
        //       names.push(key);
        //       times.push(value)
        //       console.log(names, times);
        //       x.domain(data.map(function(d) { return d.key; }));
        //       y.domain([0, d3.max(data, function(d) { return d.value; })]);
        //     });
        //   });

        d3.json("https://504-anecdotals.firebaseio.com/tests/-Jl17Ycl4AiriSPYFnZU/studentTimes.json", function(error, data) {
          var sdata = [{'bob': 2}, {'joe': 5}, {'max':8}];
          x.domain(sdata.map(function(d) {
            return d.key;
          }));
          y.domain([0, d3.max(sdata, function(d) {
            return d.value;
          })]);

          svg.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + height + ")")
              .call(xAxis);

          svg.append("g")
              .attr("class", "y axis")
              .call(yAxis)
            .append("text")
              .attr("transform", "rotate(-90)")
              .attr("y", 6)
              .attr("dy", ".71em")
              .style("text-anchor", "end")
              .text("Frequency");

          svg.selectAll(".bar")
              .data(sdata)
            .enter().append("rect")
              .attr("class", "bar")
              .attr("x", function(d) { return x(d.letter); })
              .attr("width", x
              .attr("y", function(d) { return y(d.frequency); })
              .attr("height", function(d) { return height - y(d.frequency); });

        });

        function type(d) {
          d.frequency = +d.frequency;
          return d;
        }
      }
    };
  });
