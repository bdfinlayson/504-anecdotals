angular
  .module('anecdotals')
  .config(PortalConfig);

function PortalConfig($routeProvider) {
  'use strict';
  $routeProvider
    .when('/portal', {
      templateUrl: '/js/views/portal.html',
      controller: 'PortalController',
      controllerAs: 'portal',
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
    .when('/tests/edit/:uuid', {
      templateUrl: 'js/templates/editTest.html',
      controller: 'EditTestController',
      controllerAs: 'tests',
      private: true
    })
    .when('/classes/edit/:uuid', {
      templateUrl: 'js/templates/editClass.html',
      controller: 'EditClassController',
      controllerAs: 'classes',
      private: true
    })
    .when('/classes/clSt/:uuid', {
      templateUrl: 'js/templates/editClassStudents.html',
      controller: 'EditClassController',
      controllerAs: 'classes',
      private: true
    })
    .when('/classes/clTr/:uuid', {
      templateUrl: 'js/templates/editClassTests.html',
      controller: 'EditClassController',
      controllerAs: 'tests',
      private: true
    })
    .when('/tests/results/:uuid', {
      templateUrl: 'js/templates/results.html',
      controller: 'ResultsController',
      controllerAs: 'results',
      private: true
    })
    .when('/classes/info/:uuid', {
      templateUrl: 'js/templates/infoClass.html',
      controller: 'InfoController',
      controllerAs: 'info',
      private: true
    })
    .when('/students/info/:uuid', {
      templateUrl: 'js/templates/infoStudent.html',
      controller: 'InfoController',
      controllerAs: 'info',
      private: true
    })
    .when('/tests/info/:uuid', {
      templateUrl: 'js/templates/infoTest.html',
      controller: 'InfoController',
      controllerAs: 'info',
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
      redirectTo: '/portal'
    });
}
