angular
  .module('anecdotals')
  .factory('idFactory', idFactory);

function idFactory (user, thing){
	'use strict';
  console.log('User data from the auth factory to the id factory: ', user);
	var currCounter;
	//get current id integer from fb
	var fb = $.getJSON('https://504-anecdotals.firebaseio.com/idCounter.json', function (data) {
		console.log(data); //contains curr int
		currCounter = data; // assigns data to current counter
		console.log(currCounter);
		console.log(fb); //contains response json object
		assignIntToNewModel(data, user, thing);
	});




//increment id integer by 1
	//return id integer to fb


}//assign current id integer to new model instance

   function assignIntToNewModel(data, user, thing) {
    'use strict';
    //get url location of current window
    console.log(data);
    console.log(data, user, thing)
    var currWindow = window.location;
    var currUrl = currWindow.href;
    console.log(currUrl);
    checkForInstance(data, currUrl, user, thing);
    //check for which instance to assign the integer to, then create the new model
      function checkForInstance(data, currUrl, user, thing) {
        console.log(data, currUrl, thing);
        switch(true) {
          case (currUrl.includes('classes')):
            //generate child url and send class id to fb
            var fb = new Firebase ('https://504-anecdotals.firebaseio.com/');
            fb.child('classes').child('class:' + data).set({
              'classId': data,
              'className': thing.name
            });
            alert('New class created with id of: ' + 'class:' + data);
            //increment the id counter
            data++;
            console.log('Counter was incremented to: ', data);
            //send the incremented counter to fb
            fb.update({
              'idCounter': data
            });
            break;
          case (currUrl.includes('students')):
            //generate child url and send class id to fb
            var fb = new Firebase ('https://504-anecdotals.firebaseio.com/');
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
            var fb = new Firebase ('https://504-anecdotals.firebaseio.com/');
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
          case (currUrl.includes('register')):
            //generate child url and send class id to fb
            var fb = new Firebase ('https://504-anecdotals.firebaseio.com/');
            fb.child('teachers').child('teacher:' + data).set({
              'teacherId': data,
              'email': user.email,
              'password': user.password
            });
            alert('New teacher created with id of: ' + 'teacher:' + data);
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