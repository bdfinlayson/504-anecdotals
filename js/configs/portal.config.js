angular
  .module('anecdotals')
  .config(PortalConfig);

function PortalConfig($routeProvider) {
	'use strict';
	$routeProvider
	  .when('/portal', {
	  	templateUrl: '/js/portal/portal.html',
	  	controller: 'AuthController',
	  	controllerAs: 'auth',
	  	private: true
	  })
	  .when('/settings', {
	  	templateUrl: '/js/portal/settings.html',
	  	controller: 'AuthController',
	  	controllerAs: 'auth',
	  	private: true
	  })
	  .when('/classes', {
	  	templateUrl: '/js/portal/classes.html',
	  	controller: 'AuthController',
	  	controllerAs: 'auth',
	  	private: true
	  })
	  .when('/students', {
	  	templateUrl: '/js/portal/students.html',
	  	controller: 'AuthController',
	  	controllerAs: 'auth',
	  	private: true
	  })
	  .when('/tests', {
	  	templateUrl: '/js/portal/tests.html',
	  	controller: 'AuthController',
	  	controllerAs: 'auth',
	  	private: true
	  })
	  .when('/data', {
	  	templateUrl: '/js/portal/data.html',
	  	controller: 'AuthController',
	  	controllerAs: 'auth',
	  	private: true
	  })
	  .otherwise({
	  	redirectTo: '/login'
	  });
}