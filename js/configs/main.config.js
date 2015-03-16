angular
  .module('anecdotals')
  .config(AnecdotalsConfig);

function AnecdotalsConfig($routeProvider) {
	'use strict';
	$routeProvider
	  .when('/privacy', {
	  	templateUrl: '/js/terms/privacy.html',
	  	controller: 'AuthController',
	  	controllerAs: 'auth',
	  	private: false
	  })
	  .when('/terms', {
	  	templateUrl: '/js/terms/terms.html',
	  	controller: 'AuthController',
	  	controllerAs: 'auth',
	  	private: false
	  })
	  // .when('/portal', {
	  // 	templateUrl: '/js/portal/portal.html',
	  // 	controller: 'AuthController',
	  // 	controllerAs: 'auth',
	  // 	private: true
	  // })
	  .otherwise({
	  	redirectTo: '/login'
	  });
}