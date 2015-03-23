angular
  .module('anecdotals')
  .controller('ClassController',ClassController);

  function ClassController($location, classFactory) {
    'use strict';

    var vm = this;

    classFactory.findAll(function (classes) {
      console.log('from the class controller', classes);
      vm.data = classes;

  });

  }
