angular
  .module('anecdotals')
  .controller('EditController',EditController);

  function EditController($routeParams, $http, $location, studentFactory, BASE_URL) {
    'use strict';

    var vm = this;
    var path = $location.$$path;
    var pathId = path.slice(15);
    var studentInfo;

    studentFactory.findOne(pathId, function (student) {
      vm.newStudent = student;
      studentInfo = student;
      console.log(student, vm.newStudent);
    });

    vm.deleteStudent = function (cb) {
      var fb = new Firebase('https://504-anecdotals.firebaseio.com');
      var user = fb.getAuth();
      console.log(user);
      var data;
      $http
        .get('https://504-anecdotals.firebaseio.com/teachers/' + user.uid + '.json')
        .success(function(cb) {
          data = cb;
          console.log(data);
        });

      var url = BASE_URL + '/teachers/' + user.uid + '/students/' + pathId + '.json';
      var teacherUrl = BASE_URL + '/teachers/' + user.uid + '/studentIds/' + studentInfo.deleteId + '.json';

      $http
        .delete(teacherUrl)
        .success(function () {
          console.log('student in teacher deleted');
        });

      $http
        .delete(url)
        .success(function () {
          console.log('student deleted');
          $http
            .delete(url)
            .success(function () {
              console.log('student deleted');
            });
        });




    };

  vm.addOrEditStudent = function () {
  studentFactory.update(pathId, vm.newStudent, function () {
    $location.path('/students/');
  });
};


  }
