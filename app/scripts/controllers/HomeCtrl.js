var app = angular.module("ka-ching");

app.controller("HomeCtrl", function ($scope, $rootScope, $http, $window) {
  $scope.username = $window.sessionStorage.username;
  $scope.showModal = false;
  $scope.showTransferHistory = false;

  $http({url: "http://localhost:3000/api/friends", method: "GET"}).then(
    function (response) {
      $scope.friends = response.data;
    },
    function () {
      $scope.error = "Impossible de retrouver vos amis";
    });

  $http({
    url: "http://localhost:3000/api/account",
    method: "GET"
  }).then(
    function (response) {
      $scope.balance = response.data.balance;
    });

  $scope.addFriend = function () {
    if ($scope.showModal == true) {
      $scope.showModal = false;
    } else if ($scope.showModal == false) {
      $scope.showModal = true;
    }
    $scope.friend = {
      user: {
        name: {},
        account: {}
      }
    };
  };

  $scope.submit = function (friend) {
    $http({
      url: "http://localhost:3000/api/friends",
      method: "PUT",
      data: {
        friends: [friend]
      }
    })
      .then(function (response) {
        $scope.friends = response.data;
        $scope.showModal = false;
      }, function () {
        $scope.error = "Impossible de d'ajouter l'ami";
      });
  };

  $scope.transferMoney = function (friend) {
    $http({
      url: "http://localhost:3000/api/transfers",
      method: "PUT",
      data: {
        transfer: {
          recipient: friend,
          amount: friend.transferedAmount,
          date: new Date()
        }
      }
    }).then(
      function () {
        $http({
          url: "http://localhost:3000/api/account",
          method: "GET"
        }).then(function (response) {
          $scope.balance = response.data.balance;
        });
      });
  };

  $scope.transferHistory = function () {
    $scope.showTransferHistory = !$scope.showTransferHistory;
    $http({
      url: "http://localhost:3000/api/transfers",
      method: "GET"
    }).then(
      function (response) {
        $scope.transfers = response.data;
      },
      function () {
        $scope.error = "Impossible de retrouver l'historique des transferts";
      });
  };

  $scope.orderTransfers = function (transfers, orderByDateDescending, orderByAmountDescending, groupedByRecipient) {
    // reset order
    transfers = _.sortByOrder(transfers, ["id"], ["desc"]);
    var iteratees = ["date"];
    var orders = [];
    if (orderByDateDescending) {
      orders = ["desc"];
    } else {
      orders = ["asc"];
    }
    if (orderByAmountDescending) {
      iteratees.unshift("amount");
      orders.unshift("desc");
    }
    if (groupedByRecipient) {
      iteratees.unshift("recipient");
      orders.unshift("asc");
    }
    $scope.transfers = _.sortByOrder(transfers, iteratees, orders);
  };

  $scope.toggleFriendTransfers = function (friend) {
    friend.showTransfers = !Boolean(friend.showTransfers);
    if (friend.showTransfers) {
      $http({
        url: "http://localhost:3000/api/transfers/" + friend.user.username,
        method: "GET"
      }).then(function (response) {
        friend.transfers = response.data;
      }, function () {
        $scope.error = "Impossible de retrouver l'historique des transferts de cet ami";
      });
    }
  };
});