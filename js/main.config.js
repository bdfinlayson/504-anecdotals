angular
  .module('anecdotals')
  .config(AnecdotalsConfig);

function AnecdotalsConfig($routeProvider) {
	'use strict';
	$routeProvider
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
	  .when('/portal', {
	  	templateUrl: '/js/portal/portal.html',
	  	controller: 'TermsController',
	  	controllerAs: 'terms',
	  	private: false
	  })
	  .otherwise({
	  	redirectTo: '/login'
	  });
}