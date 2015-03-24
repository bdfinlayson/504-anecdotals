angular
  .module('anecdotals')
  .controller('StudentController',StudentController);

  function StudentController($scope, $location, $routeParams, studentFactory, testFactory) {
    'use strict';

    var vm = this;



    studentFactory.findAll(function (students) {
      console.log('from the student controller', students);
      vm.data = students;
  });

  vm.sendTestResults = function () {

    var vm = this;
    var path = $location.$$path;
    var pathId = path.slice(14);
    var testInfo;

  testFactory.updateStudentTime(pathId, vm.newStudent, function () {
    // $location.path('/students/');
  });
  };
  }
