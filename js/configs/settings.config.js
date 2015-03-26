angular
  .module('anecdotals')
  .config(SettingsConfig);

function SettingsConfig($routeProvider) {
  'use strict';
  $routeProvider
    .when('/settings', {
      templateUrl: '/js/views/settings.html',
      controller: 'AuthController',
      controllerAs: 'auth',
      private: true
    })
    .when('/profile', {
      templateUrl: '/js/views/profile.html',
      controller: 'AuthController',
      controllerAs: 'auth',
      private: true
    })
    .when('/manage-account', {
      templateUrl: '/js/views/manage-account.html',
      controller: 'AuthController',
      controllerAs: 'auth',
      private: true
    })
    .when('/customize', {
      templateUrl: '/js/views/customize.html',
      controller: 'AuthController',
      controllerAs: 'auth',
      private: true
    })
    .otherwise({
      redirectTo: '/home'
    });
}
