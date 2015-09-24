var app = angular.module("ka-ching");

app.controller("HomeCtrl", function($scope, $rootScope, $http, $window) {
    $scope.nom = $window.sessionStorage.username;
    $scope.modal = false;
    $scope.showTransferHistory = false;

    $http({
        url: "http://localhost:3000/api/friends",
        method: "GET"
    }).then(function(response) {
        $scope.mes_amis = response.data;
    }, function() {
        $scope.error = "Impossible de retrouver vos amis";
    });

    var url = "http://localhost:3000/api/account";
    $http.get(url).success(function(response) {
        $scope.balance = response.balance;
    }).error(function(error) {
        $scope.error = "Impossible de retrouver le solde"
    });

    $scope.addFriend = function() {
        if ($scope.modal == true) {
            $scope.modal = false
        } else if ($scope.modal == false) {
            $scope.modal = true;
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

    $scope.submit = function(user) {
        $http({
                url: "http://localhost:3000/api/friends",
                method: "PUT",
                data: {
                    friends: [user]
                }
            })
            .then(function(response) {
                $scope.friends = response.data;
                $scope.modal = false;
                $http({
                    url: "http://localhost:3000/api/friends",
                    method: "GET"
                }).then(function(response) {
                    $scope.mes_amis = response.data;
                }, function() {
                    $scope.error = "Impossible de retrouver vos amis";
                });
            }, function() {
                $scope.error = "Impossible de d'ajouter l'ami";
            });
    };

    $scope.transferMoney = function(friend) {
        console.log(friend)
        $http({
            url: "http://localhost:3000/api/transfers",
            method: "PUT",
            data: {
                transfer: {
                    recipient: friend,
                    amount: friend.transferedAmount
                }
            }
        }).then(function() {
            $http({
                url: "http://localhost:3000/api/account",
                method: "GET"
            }).then(function(response) {
                $scope.balance = response.data.balance;
            });
        });
    };

    $scope.transferHistory = function() {
        $scope.showTransferHistory = !$scope.showTransferHistory;
        $http({
            url: "http://localhost:3000/api/transfers",
            method: "GET"
        }).then(function(response) {
            $scope.transfers = response.data;
        }, function() {
            $scope.error = "Impossible de retrouver l'historique des transferts";
        });
    };

    $scope.orderTransfers = function(transfers, orderByDateDescending, orderByAmountDescending, groupedByRecipient) {
        //reset order
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
});