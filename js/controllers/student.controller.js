angular
  .module('anecdotals')
  .controller('StudentController',StudentController);

  function StudentController($scope, $http, $location, $routeParams, studentFactory, testFactory, BASE_URL) {
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
    console.log(vm.newStudent);

  testFactory.updateStudentTime(pathId, vm.newStudent, function () {
    // $location.path('/students/');
  });
  };

  vm.addStudentToClass = function(studentId) {
    var vm = this;
    console.log(vm);
    var path = $location.$$path;
    var classId = path.slice(14);
    var studentInfo;
    console.log(classId, studentId);

    var fb = new Firebase('https://504-anecdotals.firebaseio.com');
    var user = fb.getAuth();
    console.log(user);

    //get student data
    $.getJSON('http://504-anecdotals.firebaseio.com/teachers/' + user.uid + '/students/' + studentId + '.json', function(data) {
      studentInfo = data;
      console.log(data);


    //push class id to student
    var deleteClassInStudentLocationId = fb.child('teachers').child(user.uid).child('students').child(studentId).child('classes').push(classId).key();

    //push student id to class
    var deleteStudentInClassLocationId = fb.child('teachers').child(user.uid).child('classes').child(classId).child('students').push(studentId).key();

    //update delete class location to student
    // fb.child('teachers').child(user.uid).child('students').child(studentInfo.studentId).child('deleteClassId').update({'deleteClassId': deleteClassInStudentLocationId});
    //push delete student location to class
    // fb.child('teachers').child(user.uid).child('classes').child(classId).child('students').push(deleteStudentInClassLocationId).key();


    //append student to list of current students in class
    $('tbody.studentsInClass').append('<tr id="' + studentInfo.studentId + '"><td>' + studentInfo.firstName + '</td><td>' + studentInfo.lastName + '</td><td><button ng-click="students.removeStudentFromClass()">' + "Remove From Class" + '</button></td></tr>');
  });







  };
  }
