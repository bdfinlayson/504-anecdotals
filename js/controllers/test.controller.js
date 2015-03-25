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
    console.log(classId, testId);

    var fb = new Firebase('https://504-anecdotals.firebaseio.com');
    var user = fb.getAuth();
    console.log(user);

    //get test data
    $.getJSON('http://504-anecdotals.firebaseio.com/teachers/' + user.uid + '/tests/' + testId + '.json', function(data) {
      testInfo = data;
      console.log(data);


    //push class id to test
    fb.child('teachers').child(user.uid).child('tests').child(testId).update({ 'classId': classId });

    //push test id to class
    var deleteStudentInClassLocationId = fb.child('teachers').child(user.uid).child('classes').child(classId).child('tests').push(testId).key();

    //push test info to class

    fb.child('teachers').child(user.uid).child('classes').child(classId).child('testInfo').child(testId).update({
      'name': data.name,
      'subject': data.subject,
      'date': data.date,
      'description': data.description,
      'standardTime': data.standardTime,
      'testId': data.testId
    });



    //update delete class location to student
    // fb.child('teachers').child(user.uid).child('students').child(studentInfo.studentId).child('deleteClassId').update({'deleteClassId': deleteClassInStudentLocationId});
    //push delete student location to class
    // fb.child('teachers').child(user.uid).child('classes').child(classId).child('students').push(deleteStudentInClassLocationId).key();


    //append student to list of current students in class
    $('tbody.testsInClass').append('<tr id="' + testInfo.testId + '"><td>' + testInfo.name + '</td><td>' + testInfo.description + '</td><td><button ng-click="tests.removeTestFromClass()">' + "Remove From Class" + '</button></td><td><a href="/#/tests/results/' + testId + '">' + "Results" + '</a></td></tr>');
  });


};
}
