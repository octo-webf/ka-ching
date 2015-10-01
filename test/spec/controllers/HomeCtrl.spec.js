describe("Controller: HomeCtrl", function () {
  beforeEach(module("ka-ching"));

  var scope, $httpBackend, AccountService;

  beforeEach(inject(function ($rootScope, _$httpBackend_, $controller, $http, _AccountService_) {
    $httpBackend = _$httpBackend_;
    AccountService = _AccountService_;
    scope = $rootScope.$new();
    $httpBackend.when("GET", "http://localhost:3000/api/friends")
      .respond(200, {});
    $controller("HomeCtrl", {$scope: scope, $http: $http, AccountService: AccountService});
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