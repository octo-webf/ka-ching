var app = angular.module("ka-ching");

app.controller("HomeCtrl", function ($scope, $rootScope, $http) {
  $scope.username = $rootScope.username;

  $http({url: "http://localhost:3000/api/friends", method: "GET"}).then(function (response) {
    $scope.friends = response.data;
  }, function () {
    $scope.error = "Impossible de retrouver vos amis";
  });
});