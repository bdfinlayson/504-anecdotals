angular
  .module('anecdotals')
  .controller('TestController',TestController);

  function TestController($location, testFactory) {
    'use strict';

    var vm = this;

    testFactory.findAll(function (tests) {
      console.log('from the test controller', tests);
      vm.data = tests;
  });


  vm.addTestToClass = function(testId) {
    var vm = this;
    console.log(vm);
    var path = $location.$$path;
    var classId = path.slice(14);
    var testInfo;
    var classInfo;
    console.log(classId, testId);

    var fb = new Firebase('https://504-anecdotals.firebaseio.com');
    var user = fb.getAuth();
    console.log(user);

    //get test data
    $.getJSON('http://504-anecdotals.firebaseio.com/teachers/' + user.uid + '/tests/' + testId + '.json', function(data) {
      testInfo = data;
      console.log(data);

      //get class info
      $.getJSON('http://504-anecdotals.firebaseio.com/teachers/' + user.uid + '/classes/' + classId + '.json', function(classes) {
        classInfo = classes;
        console.log(classes);


    //push class id to test
    var removeClassFromTest = fb.child('teachers').child(user.uid).child('tests').child(testId).child('classes').push({
      'classId':classId,
      'name': classInfo.name
    }).key();

    //push test id to class
    var removeTestFromClass = fb.child('teachers').child(user.uid).child('classes').child(classId).child('tests').push(testId).key();

    //push test info to class

    var deleteTestInfoFromClass = fb.child('teachers').child(user.uid).child('classes').child(classId).child('testInfo').push({
      'name': data.name,
      'subject': data.subject,
      'date': data.date,
      'description': data.description,
      'standardTime': data.standardTime,
      'testId': data.testId,
      'removeClassFromTest': removeClassFromTest,
      'removeTestFromClass': removeTestFromClass
    }).key();

    //update delete testinfo key in test within class
    fb.child("teachers").child(user.uid).child("classes").child(classId).child("testInfo").child(deleteTestInfoFromClass).update( {
      'deleteTestInfoFromClass': deleteTestInfoFromClass
    });

    //update delete class location to student
    // fb.child('teachers').child(user.uid).child('students').child(studentInfo.studentId).child('deleteClassId').update({'deleteClassId': deleteClassInStudentLocationId});
    //push delete student location to class
    // fb.child('teachers').child(user.uid).child('classes').child(classId).child('students').push(deleteStudentInClassLocationId).key();


    //append student to list of current students in class
    $('tbody.testsInClass').append('<tr id="' + testInfo.testId + '"><td>' + testInfo.name + '</td><td>' + testInfo.description + '</td><td><button ng-click="tests.removeTestFromClass()">' + "Remove From Class" + '</button></td><td><button type="button" class="btn btn-default btn-md glyphicon glyphicon-time" data-toggle="modal" data-target="#'+testId+'"></button></td></tr>');
  });

  document.querySelector('#' + testId).remove();

});

};
}
