var app = angular.module("ka-ching");

app.controller("HomeCtrl", function ($scope, $rootScope, $http, $window) {
  $scope.username = $window.sessionStorage.username;
  $scope.showModal = false;

  $http({url: "http://localhost:3000/api/friends", method: "GET"}).then(function (response) {
    $scope.friends = response.data;
  }, function () {
    $scope.error = "Impossible de retrouver vos amis";
  });

  $http({url: "http://localhost:3000/api/account", method: "GET"}).then(function (response) {
    $scope.balance = response.data.balance;
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
  };

  $scope.transferMoney = function (friend) {
    console.log(friend)
    $http({
      url: "http://localhost:3000/api/transfers",
      method: "PUT",
      data: {transfer: {recipient: friend, amount: friend.transferedAmount}}
    }).then(function() {
      $http({url: "http://localhost:3000/api/account", method: "GET"}).then(function (response) {
        $scope.balance = response.data.balance;
      });
    });
  };

});