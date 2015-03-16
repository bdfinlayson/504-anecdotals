angular
  .module('anecdotals')
  .config(AnecdotalsConfig);

function AnecdotalsConfig($routeProvider) {
	'use strict';
	$routeProvider
	  .when('/privacy', {
	  	templateUrl: '/js/views/privacy.html',
	  	controller: 'AuthController',
	  	controllerAs: 'auth',
	  	private: false
	  })
	  .when('/terms', {
	  	templateUrl: '/js/views/terms.html',
	  	controller: 'AuthController',
	  	controllerAs: 'auth',
	  	private: false
	  })
	  // .when('/portal', {
	  // 	templateUrl: '/js/views/portal.html',
	  // 	controller: 'AuthController',
	  // 	controllerAs: 'auth',
	  // 	private: true
	  // })
	  .otherwise({
	  	redirectTo: '/login'
	  });
}