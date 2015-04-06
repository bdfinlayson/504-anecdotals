angular
  .module('anecdotals')
  .controller('PortalController', PortalController);

function PortalController($location, portalFactory) {
  'use strict';

  var vm = this;



  portalFactory.findOne(function(profile) {
    console.log('from the portal controller', profile);
    vm.data = profile;
  });


}
