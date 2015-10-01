describe("Controller: HomeCtrl", function () {
  beforeEach(module("ka-ching"));

  var scope, controller, http, $httpBackend;

  beforeEach(inject(function ($rootScope, _$httpBackend_, $controller, $http) {
    $httpBackend = _$httpBackend_
    scope = $rootScope.$new();
    $httpBackend.when("GET", "http://localhost:3000/api/friends")
      .respond(200, {});
    controller = $controller("HomeCtrl", {$scope: scope, $http: $http});
    $httpBackend.expectGET("http://localhost:3000/api/account").respond(200, {data: {balance: 2000}});;
    $httpBackend.flush();
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe("the transferMoney method", function () {
    it("should call the account endpoint to get balance", function () {
      $httpBackend.when("PUT", "http://localhost:3000/api/transfers")
        .respond(200, {});
      var friend = {
        name: {
          first: "firstTest",
          last: "lastTest"
        },
        transferedAmount: "2000"
      };
      scope.transferMoney(friend);
      
      $httpBackend.expectGET("http://localhost:3000/api/account").respond(200, {data: {balance: 2000}});
      $httpBackend.flush();
    });
  });

});