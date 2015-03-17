angular
  .module('anecdotals')
  .factory('idFactory', idFactory);

function idFactory (BASE_URL){
	'use strict';
	var currCounter;
	//get current id integer from fb
	var fb = $.getJSON('https://504-anecdotals.firebaseio.com/idCounter.json', function (data) {
		console.log(data); //contains curr int
		currCounter = data; // assigns data to current counter
		console.log(currCounter);
		console.log(fb); //contains response json object
		assignIntToNewModel(data);
	});




//increment id integer by 1
	//return id integer to fb


}//assign current id integer to new model instance

   function assignIntToNewModel(data) {
    'use strict';
    //get url location of current window
    console.log(data);
    var currWindow = window.location;
    var currUrl = currWindow.href;
    console.log(currUrl);
    checkForInstance(data, currUrl);
    //check for which instance to assign the integer to, then create the new model
      function checkForInstance(data, currUrl) {
        console.log(data, currUrl);
        switch(true) {
          case (currUrl.includes('classes')):
            //generate child url and send class id to fb
            var fb = new Firebase ('https://504-anecdotals.firebaseio.com/');
            fb.child('classes').child('class:' + data).set({
              'classId': data
            });
            alert('New class created with id of: ' + 'class' + data);
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