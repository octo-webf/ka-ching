var app = angular.module("ka-ching");
app.controller("MainCtrl", function($scope, $location, $window) {
  $scope.logout = function() {
    delete $window.sessionStorage.token;
    $location.url("/login");
  }
});