angular
  .module('anecdotals')
  .config(authConfig)
  .run(privateRoutes);

function authConfig($routeProvider) {
  'use strict';
  $routeProvider
    .when('/login', {
      templateUrl: 'js/auth/login.html',
      controller: 'AuthController',
      controllerAs: 'auth',
      resolve: {
        data: function ($location, authFactory) {
          if (authFactory.isLoggedIn()) {
            console.log('user is logged in! Redirecting to portal!')
            $location.path('/portal');
          }
        }
      }
    })
    .when('/logout', {
      template: 'js/auth/logout.html',
      controller: 'LogoutController'
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
    });
  }

function privateRoutes($rootScope, $location, authFactory) {
  'use strict';
  $rootScope.$on('$routeChangeStart', function (event, nextRoute) {

    $rootScope.user = authFactory.getAuth();

    if (loginRequired()) {
      $location.path('/login');
    }

    function loginRequired() {
      return nextRoute.$$route && nextRoute.$$route.private && !authFactory.isLoggedIn();
    }
  });
}


