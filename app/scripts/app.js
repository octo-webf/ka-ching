var app = angular.module("ka-ching", ["ngRoute"]);
app.factory('authInterceptor', function ($rootScope, $q, $window, $location) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if ($window.sessionStorage.token) {
        config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
      }
      return config;
    },
    response: function (response) {
      if (response.status === 401) {
        // handle the case where the user is not authenticated
        $window.sessionStorage.removeItem('token');
        $location.url('/login');
      } else {
        return response || $q.when(response);
      }
    },
    responseError: function (response) {
      if (response.status === 401) {
        $window.sessionStorage.removeItem('token');
        $location.url('/login');
      }
      return response || $q.when(response);
    }
  };
});
app.config(['$routeProvider', '$httpProvider',
  function ($routeProvider, $httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
    $routeProvider.
      when('/login', {
        templateUrl: 'views/login/login.html',
        controller: 'LoginCtrl'
      }).
      when('/home', {
        templateUrl: 'views/home/home.html',
        controller: 'HomeCtrl'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);

