angular
  .module('anecdotals.directives.loginNav', [])
  .directive('loginNav', function() {
    'use strict';
    return {
      restrict: 'E',
      scope: {
        data: '='
      },
      templateUrl: 'js/templates/loginNav.html',
      controller: function($scope) {
        console.log('login navbar showing!');
      }
    };
  });
