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



  vm.submit = function(whatToMake) {
    console.log('what to make is ', whatToMake)
    var fb = new Firebase('https://504-anecdotals.firebaseio.com');
    var user = fb.getAuth();
    console.log(user);
    assignIntToNewModel(user, vm.thing, whatToMake);

  };

  //assign current id integer to new model instance

  function assignIntToNewModel(user, thing, whatToMake) {

    checkForInstance(user, thing, whatToMake);
    //check for which instance to assign the new model
    function checkForInstance(user, thing, whatToMake) {
      console.log(thing, whatToMake);
      switch (true) {
        case (whatToMake === "classes"):
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

          fb.child('teachers').child(user.uid).child('classes').child(classId).update({
            'classId': classId
          });
          $('tbody').append('<tr><td>' + thing.name + '</td><td>' + thing.gradeLevel + '</td><td><button ng-if="!class.expanded" ng-click="class.expanded = true">+</button></td><td><div class="dropdown"><button id="dLabel" class="glyphicon glyphicon-cog" data-target="" href="" data-toggle="dropdown" area-haspopup="true" role="button" area-expanded="false">' + " " + '<span class="caret"></span></button><ul class="dropdown-menu" role="menu" aria-labelledby="dLabel"><li><a href="#/classes/edit/' + classId + '">' + "Edit Class" + '</a></li><li><a href="#/classes/clSt/' + classId + '">' + "Add/Remove Students" + '</a></li><li><a href="#/classes/edit-class-tests/' + classId + '">' + "Edit Tests" + '</a></li><li><a href="#/classes/info/' + classId + '">' + "Class Info" + '</a></li></ul></div></td></tr>');
          clear();


          var deleteId = fb.child('teachers').child(user.uid).child('classIds').push(classId).key();
          fb.child('teachers').child(user.uid).child('classes').child(classId).update({
            'deleteId': deleteId
          });

          // $('#alertSuccess').removeClass('hide');


          break;
        case (whatToMake === 'students'):
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

          fb.child('teachers').child(user.uid).child('students').child(studentId).update({
            'studentId': studentId
          });
          $('tbody').append('<tr><td>' + thing.firstName + '</td><td>' + thing.lastName + '</td><td>' + thing.additionalInfo + '</td><td><button ng-if="!class.expanded" ng-click="class.expanded = true">+</button></td><td><div class="dropdown"><button id="dLabel" class="glyphicon glyphicon-cog" data-target="" href="" data-toggle="dropdown" area-haspopup="true" role="button" area-expanded="false">' + " " + '<span class="caret"></span></button><ul class="dropdown-menu" role="menu" aria-labelledby="dLabel"><li><a href="#/students/edit/' + studentId + '">' + "Edit" + '</a></li><li><a href="#/students/info/' + studentId + '">' + "Student Info" + '</a></li></ul></div></td></tr>');
          clear();

          var deleteId = fb.child('teachers').child(user.uid).child('studentIds').push(studentId).key();
          fb.child('teachers').child(user.uid).child('students').child(studentId).update({
            'deleteId': deleteId
          });

          break;
        case (whatToMake === 'tests'):
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


          fb.child('teachers').child(user.uid).child('tests').child(testId).update({
            'testId': testId
          });
          $('tbody').append('<tr><td>' + thing.name + '</td><td>' + thing.subject + '</td><td>' + thing.date + '</td><td>' + thing.description + '</td><td>' + thing.standardTime + '</td><td><button ng-if="!class.expanded" ng-click="class.expanded = true">+</button></td><td><div class="dropdown"><button id="dLabel" class="glyphicon glyphicon-cog" data-target="" href="" data-toggle="dropdown" area-haspopup="true" role="button" area-expanded="false">' + " " + '<span class="caret"></span></button><ul class="dropdown-menu" role="menu" aria-labelledby="dLabel"><li><a href="#/tests/edit/' + testId + '">' + "Edit" + '</a></li><li><a href="#/tests/results/' + testId + '">' + "Results" + '</a></li><li><a href="#/tests/info/' + testId + '">' + "Test Info" + '</a></li></ul></div></td></tr>');
          clear();

          var deleteId = fb.child('teachers').child(user.uid).child('testIds').push(testId).key();
          fb.child('teachers').child(user.uid).child('tests').child(testId).update({
            'deleteId': deleteId
          });
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
