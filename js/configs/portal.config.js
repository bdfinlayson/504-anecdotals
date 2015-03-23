angular
  .module('anecdotals')
  .config(PortalConfig);

function PortalConfig($routeProvider) {
  'use strict';
  $routeProvider
    .when('/portal', {
      templateUrl: '/js/views/portal.html',
      controller: 'AuthController',
      controllerAs: 'auth',
      private: true
    })
    .when('/settings', {
      templateUrl: '/js/views/settings.html',
      controller: 'AuthController',
      controllerAs: 'auth',
      private: true
    })
    .when('/classes', {
      templateUrl: '/js/views/classes.html',
      controller: 'NewController',
      controllerAs: 'new',
      private: true
    })
    .when('/students', {
      templateUrl: '/js/views/students.html',
      controller: 'NewController',
      controllerAs: 'new',
      private: true
    })
    .when('/students/edit/:uuid', {
      templateUrl: 'js/templates/editStudent.html',
      controller: 'EditController',
      controllerAs: 'students',
      private: true
    })
    .when('/tests', {
      templateUrl: '/js/views/tests.html',
      controller: 'NewController',
      controllerAs: 'new',
      private: true
    })
    .when('/data', {
      templateUrl: '/js/views/data.html',
      controller: 'AuthController',
      controllerAs: 'auth',
      private: true
    })
    .otherwise({
      redirectTo: '/login'
    });
}
