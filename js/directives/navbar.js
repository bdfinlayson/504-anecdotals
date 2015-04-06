angular
  .module('anecdotals.directives.navbar', [])
  .directive('navbar', function() {
    'use strict';
    return {
      restrict: 'E',
      scope: {
        data: '='
      },
      templateUrl: 'js/templates/navbar.html',
      controller: function($scope) {
        console.log('navbar showing!');
      }
    };
  });
