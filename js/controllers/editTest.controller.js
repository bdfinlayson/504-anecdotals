angular
  .module('anecdotals')
  .controller('EditTestController',EditTestController);

  function EditTestController($routeParams, $http, $location, testFactory, BASE_URL) {
    'use strict';

    var vm = this;
    var path = $location.$$path;
    var pathId = path.slice(12);
    var testInfo;

    testFactory.findOne(pathId, function (test) {
      vm.newTest = test;
      testInfo = test;
      console.log(test, vm.newTest);
    });

    vm.deleteTest = function (cb) {
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

      var url = BASE_URL + '/teachers/' + user.uid + '/tests/' + pathId + '.json';
      var teacherUrl = BASE_URL + '/teachers/' + user.uid + '/testIds/' + testInfo.deleteId + '.json';

      $http
        .delete(teacherUrl)
        .success(function () {
          console.log('test in teacher deleted');
        });

      $http
        .delete(url)
        .success(function () {
          console.log('test deleted');
          $http
            .delete(url)
            .success(function () {
              console.log('test deleted');
            });
        });



    };

  vm.addOrEditTest = function () {
  testFactory.update(pathId, vm.newTest, function () {
    $location.path('/tests/');
  });
};


  }
