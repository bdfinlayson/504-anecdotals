angular
  .module('annecdotals')
  .config(AnnecdotalsConfig);

function AnnecdotalsConfig($routeProvider) {
	'use strict';
	$routeProvider
	  .when('/', { //TODO: look into how to rename link
	    templateUrl: 'index.html',
	    controller: 'AuthController',
	    controllerAs: 'auth',
	    private: true
	  })
	  .when('/login', {
	  	templateUrl: '/js/auth/login.html',
	  	controller: 'AuthController',
	  	controllerAs: 'auth',
	  	private: false
	  })
	  .when('/register', {
	  	templateUrl: '/js/auth/register.html',
	  	controller: 'AuthController',
	  	controllerAs: 'auth',
	  	private: false
	  })
  	  .when('/forgot', {
	  	templateUrl: '/js/auth/forgot.html',
	  	controller: 'AuthController',
	  	controllerAs: 'auth',
	  	private: false
	  })
	  .when('/logout', {
	  	templateUrl: '/js/auth/logout.html',
	  	controller: 'AuthController',
	  	controllerAs: 'auth',
	  	private: true
	  })
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