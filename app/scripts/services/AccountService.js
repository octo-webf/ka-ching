angular.module("ka-ching")
  .factory("AccountService", function ($http) {
    return {
      getAccount: function(callback) {
        $http.get("http://localhost:3000/api/account").then(callback);
      }
    }
  });