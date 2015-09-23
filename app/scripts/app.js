var app = angular.module("ka-ching", ["ngRoute"]);
app.config(['$routeProvider',
  function ($routeProvider) {
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
