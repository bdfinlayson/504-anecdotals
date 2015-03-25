angular
  .module('anecdotals')
  .controller('InfoController', InfoController);


  function InfoController($http, $rootScope, $scope, $location, BASE_URL, infoFactory) {
    'use strict';
    var currWindow = window.location;
    var currUrl = currWindow.href;
    console.log(currUrl);


switch(true) {
  case (currUrl.includes('classes')):
    console.log('info switch fired at: ', currUrl);
    var path = $location.$$path;
    var pathId = path.slice(14);
    console.log(pathId);
    var vm = this;

    infoFactory.findOneClass(function (oneClass) {
      console.log('Class info from the info factory', oneClass);
      vm.data = oneClass;
    });

    break;
    default:
    break;
  }




}
