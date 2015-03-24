angular
  .module('anecdotals')
  .controller('EditClassController',EditClassController);

  function EditClassController($routeParams, $http, $location, studentFactory, testFactory, classFactory, BASE_URL) {
    'use strict';

    var vm = this;
    var path = $location.$$path;
    var pathId = path.slice(14);
    var classInfo;

    classFactory.findOne(pathId, function (clss) {
      vm.newClass = clss;
      classInfo = clss;
      console.log(clss, vm.newClass);
    });

    vm.deleteClass = function (cb) {
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

      var url = BASE_URL + '/teachers/' + user.uid + '/classes/' + pathId + '.json';
      var teacherUrl = BASE_URL + '/teachers/' + user.uid + '/classIds/' + classInfo.deleteId + '.json';

      $http
        .delete(teacherUrl)
        .success(function () {
          console.log('class in teacher deleted');
        });

      $http
        .delete(url)
        .success(function () {
          console.log('class deleted');
          $http
            .delete(url)
            .success(function () {
              console.log('class deleted');
            });
        });




    };

  vm.addOrEditClass = function () {
  classFactory.update(pathId, vm.newClass, function () {
    $location.path('/classes/');
  });
};

// vm.sendTestResults = function () {
// testFactory.update(pathId, vm.newStudent, function () {
//   $location.path('/students/');
// });
// };


  }
