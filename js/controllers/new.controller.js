angular
  .module('anecdotals')
  .controller('NewController', NewController);

function NewController($http, $rootScope, $scope, $location, BASE_URL) {
  'use strict';
  console.log('newcontroller fired');

  var vm = this;
  console.log($scope);
  console.log(vm);

  vm.thing = {};
  console.log(vm.thing);



  vm.submit = function() {
    var fb = new Firebase('https://504-anecdotals.firebaseio.com');
    var user = fb.getAuth();
    console.log(user);
    assignIntToNewModel(user, vm.thing);

  };

  //assign current id integer to new model instance

  function assignIntToNewModel(user, thing) {
    'use strict';
    //get url location of current window
    console.log(user, thing);
    var currWindow = window.location;
    var currUrl = currWindow.href;
    console.log(currUrl);
    checkForInstance(currUrl, user, thing);
    //check for which instance to assign the new model
    function checkForInstance(currUrl, user, thing) {
      console.log(currUrl, thing);
      switch (true) {
        case (currUrl.includes('classes')):
          //generate child url and send class data to fb
          var fb = new Firebase('https://504-anecdotals.firebaseio.com/');
          var classId = fb.child('teachers').child(user.uid).child('classes').push({
            name: thing.name,
            gradeLevel: thing.gradeLevel,
            teacherEmail: user.password.email,
            teacher: user.uid,
            classId: 'undefined',
            deleteId: 'undefined',
            tests: 'undefined'
          }).key();

          fb.child('teachers').child(user.uid).child('classes').child(classId).update( {'classId': classId } );
          $('tbody').append('<tr><td>' + thing.name + '</td><td>' + thing.gradeLevel + '</td><td><a href="/#/classes/edit/' + classId + '">' + "Edit Class" + '</a></td><td><a href="/#/classes/clSt/' + classId + '">' + "Add/Remove Students" + '</a></td><td><a href="/#/classes/edit-class-tests/' + classId + '">' + "Edit Tests" + '</a></td><td><a href="/#/classes/info/' + classId + '">' + "Class Info" + '</a></td></tr>');
          clear();


          var deleteId = fb.child('teachers').child(user.uid).child('classIds').push(classId).key();
          fb.child('teachers').child(user.uid).child('classes').child(classId).update( {'deleteId': deleteId } );

          break;
        case (currUrl.includes('students')):
          //generate child url and send class id to fb
          var fb = new Firebase('https://504-anecdotals.firebaseio.com/');
          var studentId = fb.child('teachers').child(user.uid).child('students').push({
            'firstName': thing.firstName,
            'lastName': thing.lastName,
            'additionalInfo': thing.additionalInfo,
            'teacherEmail': user.password.email,
            'teacherUid': user.uid,
            'studentId': 'undefined',
            'deleteId': 'undefined',
            'testTimes': 'undefined'
          }).key();

          fb.child('teachers').child(user.uid).child('students').child(studentId).update( {'studentId': studentId } );
          $('tbody').append('<tr><td>' + thing.firstName + '</td><td>' + thing.lastName + '</td><td>' + thing.additionalInfo + '</td><td><a href="/#/students/edit/' + studentId + '">' + "Edit" + '</a></td><td><a href="/#/students/info/' + studentId + '">' + "Student Info" + '</a></td></tr>');
          clear();

          var deleteId = fb.child('teachers').child(user.uid).child('studentIds').push(studentId).key();
          fb.child('teachers').child(user.uid).child('students').child(studentId).update( {'deleteId': deleteId } );

          break;
        case (currUrl.includes('tests')):
          var fb = new Firebase('https://504-anecdotals.firebaseio.com/');
          var testId = fb.child('teachers').child(user.uid).child('tests').push({
            'name': thing.name,
            'date': thing.date,
            'subject': thing.subject,
            'description': thing.description,
            'standardTime': thing.standardTime,
            'teacherEmail': user.password.email,
            'teacherUid': user.uid,
            'testId': 'undefined',
            'deleteId': 'undefined',
            'studentTimes': 'undefined'
          }).key();


          fb.child('teachers').child(user.uid).child('tests').child(testId).update( {'testId': testId } );
          $('tbody').append('<tr><td>' + thing.name + '</td><td>' + thing.subject + '</td><td>' + thing.date + '</td><td>' + thing.description + '</td><td>' + thing.standardTime + '</td><td><a href="/#/tests/edit/' + testId + '">' + "Edit" + '</a></td><td><a href="/#/tests/results/' + testId + '">' + "Results" + '</a></td><td><a href="/#/tests/info/' + testId + '">' + "Test Info" + '</a></td></tr>');
          clear();

          var deleteId = fb.child('teachers').child(user.uid).child('testIds').push(testId).key();
          fb.child('teachers').child(user.uid).child('tests').child(testId).update( {'deleteId': deleteId } );
          break;
        default:
          break;
      }
    }
  }

  function clear() {
    $('input[type="text"]').val('');
    $('input[type="email"]').val('');
    $('input[type="password"]').val('');
    $('input[type="date"]').val('');
    $('input[type="number"]').val('');
    $('input[type="phone"]').val('');
  }

}
