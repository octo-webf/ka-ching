var app = angular.module("ka-ching");

app.controller("HomeCtrl", function ($scope, $rootScope, $http, $window) {
  $scope.username = $window.sessionStorage.user.username;
  $scope.showModal = false;

  $http({url: "http://localhost:3000/api/friends", method: "GET"}).then(function (response) {
    $scope.friends = response.data;
  }, function () {
    $scope.error = "Impossible de retrouver vos amis";
  });

  $scope.addFriend = function () {
    if ($scope.showModal == true) {
      $scope.showModal = false
    } else if ($scope.showModal == false) {
      $scope.showModal = true;
    }
    $scope.friend = {
      user: {
        name: {
          first: undefined,
          last: undefined
        },
        account: {
          number: undefined
        }
      }
    }
  };

  $scope.submit = function (friend) {
    $http({url: "http://localhost:3000/api/friends", method: "PUT", data: {friends: [friend]}})
      .then(function (response) {
        $scope.friends = response.data;
        $scope.showModal = false;
      }, function () {
        $scope.error = "Impossible de d'ajouter l'ami";
      });
  }

});