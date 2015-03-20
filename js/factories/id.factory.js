angular
  .module('anecdotals')
  .factory('idFactory', idFactory);

function idFactory(user, authData, thing) {
  'use strict';
  console.log('User data from the auth factory to the id factory: ', user);
}

//assign current id integer to new model instance

function assignIntToNewModel(data, user, authData, thing) {
  'use strict';
  //get url location of current window
  console.log(data);
  console.log(data, user, authData, thing);
  var currWindow = window.location;
  var currUrl = currWindow.href;
  console.log(currUrl);
  checkForInstance(data, currUrl, user, authData, thing);
  //check for which instance to assign the integer to, then create the new model
  function checkForInstance(data, currUrl, user, authData, thing) {
    console.log(data, currUrl, thing);
    switch (true) {
      case (currUrl.includes('students')):
        //generate child url and send class id to fb
        var fb = new Firebase('https://504-anecdotals.firebaseio.com/');
        fb.child('students').child('student:' + data).set({
          'studentId': data
        });
        alert('New student created with id of: ' + 'student:' + data);
        //increment the id counter
        data++;
        console.log('Counter was incremented to: ', data);
        //send the incremented counter to fb
        fb.update({
          'idCounter': data
        });
        break;
      case (currUrl.includes('tests')):
        //generate child url and send class id to fb
        var fb = new Firebase('https://504-anecdotals.firebaseio.com/');
        fb.child('tests').child('test:' + data).set({
          'testId': data
        });
        alert('New test created with id of: ' + 'test:' + data);
        //increment the id counter
        data++;
        console.log('Counter was incremented to: ', data);
        //send the incremented counter to fb
        fb.update({
          'idCounter': data
        });
        break;
      default:
        break;
    }
  }
}
