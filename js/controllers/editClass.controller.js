angular
  .module('anecdotals')
  .controller('EditClassController',EditClassController);

  function EditClassController($routeParams, $http, $location, studentFactory, testFactory, classFactory, BASE_URL) {
    'use strict';

    var vm = this;
    var path = $location.$$path;
    var pathId = path.slice(14);
    // var pathId2 = path.slice(14);
    var classInfo;
    var classStudentInfo;

    classFactory.findAllStudents(pathId, function(students) {
      vm.data = students;
      classStudentInfo = students;
      console.log(students, vm.students);
    });

    testFactory.findAllTestsInClass(pathId, function (tests) {
      console.log('from the test controller', tests);
      vm.data = tests;
  });

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

  vm.addOrEditClass = function (studentId) {
  classFactory.update(pathId, vm.newClass, function () {
    $location.path('/classes/');
  });
};

  vm.removeStudentFromClass = function (studentId, removeStudentFromClass, removeClassFromStudent, deleteStudentInfoFromClass) {
    console.log(studentId, removeStudentFromClass, removeClassFromStudent, deleteStudentInfoFromClass);
    var fb = new Firebase('https://504-anecdotals.firebaseio.com');
    var user = fb.getAuth();
    console.log(user);
    var data;

    //remove student id from "students" in class

    fb.child('teachers').child(user.uid).child('classes').child(pathId).child('students').child(removeStudentFromClass).remove();

    //remove class id from student in "student/classes"

    fb.child('teachers').child(user.uid).child('students').child(studentId).child('classes').child(removeClassFromStudent).remove();

    //remove student info from class in "studentInfo"

    fb.child('teachers').child(user.uid).child('classes').child(pathId).child('studentInfo').child(deleteStudentInfoFromClass).remove();

    document.querySelector('#' + studentId).remove();





    // $http
    //   .delete('https://504-anecdotals.firebaseio.com/teachers/' + user.uid + '/classes/' + pathId + '/students/' + removeStudentFromClass)
    //   .success(function() {
    //     console.log('student id removed from the class');
    //   });


    // $http
    //   .get('https://504-anecdotals.firebaseio.com/teachers/' + user.uid + '.json')
    //   .success(function(cb) {
    //     data = cb;
    //     console.log(data);
    //   });
    //
    // var url = BASE_URL + '/teachers/' + user.uid + '/classes/' + pathId + '.json';
    // var studentUrl = BASE_URL + '/teachers/' + user.uid + '/students/' + classInfo.deleteId + '.json';
    //
    // $http
    //   .delete(teacherUrl)
    //   .success(function () {
    //     console.log('class in teacher deleted');
    //   });
    //
    // $http
    //   .delete(url)
    //   .success(function () {
    //     console.log('class deleted');
    //     $http
    //       .delete(url)
    //       .success(function () {
    //         console.log('class deleted');
    //       });
    //   });
  };

// vm.sendTestResults = function () {
// testFactory.update(pathId, vm.newStudent, function () {
//   $location.path('/students/');
// });
// };
vm.removeTestFromClass = function (testId, removeTestFromClass, removeClassFromTest, deleteTestInfoFromClass) {
  console.log(testId, removeTestFromClass, removeClassFromTest, deleteTestInfoFromClass);
  var fb = new Firebase('https://504-anecdotals.firebaseio.com');
  var user = fb.getAuth();
  console.log(user);
  var data;

  //remove test id from "tests" in class

  fb.child('teachers').child(user.uid).child('classes').child(pathId).child('tests').child(removeTestFromClass).remove();

  //remove class id from test in "test/classes"

  fb.child('teachers').child(user.uid).child('tests').child(testId).child('classes').child(removeClassFromTest).remove();

  //remove test info from class in "class/testInfo"

  fb.child('teachers').child(user.uid).child('classes').child(pathId).child('testInfo').child(deleteTestInfoFromClass).remove();

  document.querySelector('#' + testId).remove();

};


  }
