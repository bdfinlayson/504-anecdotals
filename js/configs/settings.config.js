angular
  .module('anecdotals')
  .config(SettingsConfig);

function SettingsConfig($routeProvider) {
	'use strict';
	$routeProvider
	  .when('/settings', {
	  	templateUrl: '/js/portal/settings.html',
	  	controller: 'AuthController',
	  	controllerAs: 'auth',
	  	private: true
	  })
	  .when('/profile', {
	  	templateUrl: '/js/portal/profile.html',
	  	controller: 'AuthController',
	  	controllerAs: 'auth',
	  	private: true
	  })
	  .when('/manage-account', {
	  	templateUrl: '/js/portal/manage-account.html',
	  	controller: 'AuthController',
	  	controllerAs: 'auth',
	  	private: true
	  })
	  .when('/customize', {
	  	templateUrl: '/js/portal/customize.html',
	  	controller: 'AuthController',
	  	controllerAs: 'auth',
	  	private: true
	  })
	  .otherwise({
	  	redirectTo: '/login'
	  });
}