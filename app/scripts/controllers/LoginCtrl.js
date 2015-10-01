var app = angular.module("ka-ching");
app.controller("LoginCtrl", function ($scope, $rootScope, $http, $window, $location) {
  $scope.submit = function (credentials) {
    return $http({
      url: "http://localhost:3000/api/authenticate",
      method: "POST",
      data: credentials
    }).then(function (response) {
      $window.sessionStorage.token = response.data.token;
      $window.sessionStorage.username = response.data.username;
      $location.url("/home");
    }, function () {
      delete $window.sessionStorage.token;
      $scope.error = "Error: Invalid user or password";
    });
  };
});