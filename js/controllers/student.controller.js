angular
  .module('anecdotals')
  .controller('StudentController',StudentController);

  function StudentController($scope, $rootScope, $http, $location, $routeParams, studentFactory, testFactory, BASE_URL) {
    'use strict';

    var vm = this;



    studentFactory.findAll(function (students) {
      console.log('from the student controller', students);
      vm.data = students;
  });

  vm.sendTestResults = function (student) {

    var vm = this;
    console.log(vm);
    var path = $location.$$path;
    var pathId = path.slice(14);
    var testInfo;
    console.log(student);
    $('input[type="number"]').val('');


  testFactory.updateStudentTime(pathId, student, function () {
  });
  };

  vm.addStudentToClass = function(studentId) {
    var vm = this;
    console.log(vm);
    var path = $location.$$path;
    var classId = path.slice(14);
    var studentInfo;
    console.log(classId, studentId);


    var fb = new Firebase('https://504-anecdotals.firebaseio.com/');
    var user = fb.getAuth();

    var fb2 = new Firebase('https://504-anecdotals.firebaseio.com/teachers/' + user.uid);

    console.log(user);

    //get student data
    $.getJSON('http://504-anecdotals.firebaseio.com/teachers/' + user.uid + '/students/' + studentId + '.json', function(data) {
      studentInfo = data;
      console.log(data);


    //push class id to student
    var removeClassFromStudent = fb.child('teachers').child(user.uid).child('students').child(studentId).child('classes').push(classId).key();

    //push student id to class
    var removeStudentFromClass = fb.child('teachers').child(user.uid).child('classes').child(classId).child('students').push(studentId).key();

    //push student info to class
    var deleteStudentInfoFromClass = fb.child('teachers').child(user.uid).child('classes').child(classId).child('studentInfo').push( {
      'firstName': data.firstName,
      'lastName': data.lastName,
      'additionalInfo': data.additionalInfo,
      'teacherEmail': user.password.email,
      'teacherUid': user.uid,
      'studentId': data.studentId,
      'deleteId': data.deleteId,
      'testTimes': data.testTimes,
      'removeClassFromStudent': removeClassFromStudent,
      'removeStudentFromClass': removeStudentFromClass
    }).key();

    //update delete studentinfo key in student within class

    fb2.child("classes").child(classId).child("studentInfo").child(deleteStudentInfoFromClass).update( {
      'deleteStudentInfoFromClass': deleteStudentInfoFromClass
    });



    //append student to list of current students in class
    $('tbody.studentsInClass').append('<tr id="' + studentInfo.studentId + '"><td>' + studentInfo.firstName + '</td><td>' + studentInfo.lastName + '</td><td><button ng-click="students.removeStudentFromClass(student.studentId, student.removeClassFromStudent, student.removeStudentFromClass, student.deleteStudentInfoFromClass)">' + "Remove From Class" + '</button></td></tr>');
  });



  document.querySelector('#' + studentId).remove();




  };

  }
