angular
  .module('anecdotals')
  .controller('TestController',TestController);

  function TestController($location, testFactory) {
    'use strict';

    var vm = this;

    testFactory.findAll(function (tests) {
      console.log('from the test controller', tests);
      vm.data = tests;
  });


  }
