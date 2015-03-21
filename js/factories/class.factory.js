angular
  .module('anecdotals')
  .factory('classFactory', classFactory);

  function classFactory($http, BASE_URL) {
    'use strict';
    var classes = {};

    classes.findAll = function (cb) {
      $http
        .get(BASE_URL + '/classes.json')
        .success(function (data) {
          cb(data);
      });

  };
  return classes;
}
//
//
//
// var currWindow = window.location;
// var currUrl = currWindow.href;
// console.log(currUrl);
//
// switch (true) {
//   case (currUrl.includes('classes')):
//     console.log('switch is firing');
//       $http
//         .get(BASE_URL + '/classes.json')
//         .success(function(data) {
//           console.log(data);
//           vm.data = data;
//         });
//     break;
//     default:
//     break;
