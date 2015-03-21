angular
  .module('anecdotals')
  .controller('ClassController',ClassController);

  function ClassController($location, classFactory) {
    'use strict';

    var vm = this;

    classFactory.findAll(function (classes) {
    vm.data = classes;
  });


  }
