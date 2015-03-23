angular
  .module('anecdotals')
  .controller('NewController', NewController);

function NewController($rootScope, $scope, $location, BASE_URL) {
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
          var classId = fb.child('classes').push({
            name: thing.name,
            subject: thing.type,
            gradeLevel: thing.gradeLevel,
            teacherEmail: user.password.email,
            teacher: user.uid
          }).key();

          clear();

          fb.child('teachers').child(user.uid).child('classes').push(classId);
          break;
        case (currUrl.includes('students')):
          //generate child url and send class id to fb
          var fb = new Firebase('https://504-anecdotals.firebaseio.com/');
          var studentId = fb.child('students').push({
            'firstName': thing.firstName,
            'lastName': thing.lastName,
            'additionalInfo': thing.additionalInfo,
            'teacherEmail': user.password.email,
            'teacherUid': user.uid
          }).key();

          clear();

          fb.child('teachers').child(user.uid).child('students').push(studentId);
          break;
        case (currUrl.includes('tests')):
          var fb = new Firebase('https://504-anecdotals.firebaseio.com/');
          var testId = fb.child('tests').push({
            'name': thing.testName,
            'date': thing.testDate,
            'description': thing.type,
            'commonCore': thing.commonCore,
            'standardTime': thing.standardTime,
            'teacherEmail': user.password.email,
            'teacherUid': user.uid,
          }).key();

          clear();

          fb.child('teachers').child(user.uid).child('tests').push(testId);
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
