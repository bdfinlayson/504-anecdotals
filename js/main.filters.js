angular
  .module('anecdotals')
  .filter('objToArr', function () {
    'use strict';
    return function (obj) {
      if (obj) {
        return Object.keys(obj).map(function (key) {
          obj[key]['_id'] = key;
          return obj[key];
        });
      }
    };
  });
