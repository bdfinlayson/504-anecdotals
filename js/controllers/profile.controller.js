angular
  .module('anecdotals')
  .controller('ProfileController', ProfileController);

function ProfileController($location, profileFactory) {
  'use strict';

  var vm = this;

  profileFactory.findAll(function(profiles) {
    console.log('from the profile controller', profiles);
    vm.data = profiles;
  });


}
