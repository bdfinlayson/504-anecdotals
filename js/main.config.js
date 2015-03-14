angular
  .module('anecdotals')
  .config(AnecdotalsConfig);

function AnecdotalsConfig($routeProvider) {
	'use strict';
	$routeProvider
	  // .when('/', { //TODO: look into how to rename link
	  //   templateUrl: 'index.html',
	  //   controller: 'AuthController',
	  //   controllerAs: 'auth',
	  //   private: true
	  // })
	  .when('/privacy', {
	  	templateUrl: '/js/terms/privacy.html',
	  	controller: 'TermsController',
	  	controllerAs: 'terms',
	  	private: false
	  })
	  .when('/terms', {
	  	templateUrl: '/js/terms/terms.html',
	  	controller: 'TermsController',
	  	controllerAs: 'terms',
	  	private: false
	  })
	  .otherwise({
	  	redirectTo: '/'
	  });
}