angular
  .module('anecdotals')
  .controller('StudentController',StudentController);

  function StudentController($location, studentFactory) {
    'use strict';

    var vm = this;

    studentFactory.findAll(function (students) {
      console.log('from the student controller', students);
      vm.data = students;
  });


  }
