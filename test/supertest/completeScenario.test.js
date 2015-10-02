var supertest = require("supertest");
var authentificationHelper = require("../helpers/authentificationHelper");
var expect = require("chai").expect;

describe("API: FriendsApi", function () {

        var server = supertest.agent("http://localhost:3000");

        beforeEach(authentificationHelper.authentify(server));

        describe("the /api/friends endpoint", function () {
            it("should return the friends", function (done) {
                server.get("/api/friends")
                    .set("Authorization", 'Bearer ' + TOKEN)
                    .expect(200)
                    .end(function (err, res) {
                        expect(res.body.length).to.equal(100);
                        done(err)
                    });
            });
        });

        describe("the /api/transfers endpoint", function () {
            it("should return the transfers", function (done) {
                server.get("/api/transfers")
                    .set("Authorization", 'Bearer ' + TOKEN)
                    .expect(200)
                    .end(function (err, res) {
                        expect(res.body.length).to.equal(22);
                        done(err)
                    });
            });
        });

        describe("the /api/user endpoint", function () {
            it("should return the user infos", function (done) {
                server.get("/api/user")
                    .set("Authorization", 'Bearer ' + TOKEN)
                    .expect(200)
                    .end(function (err, res) {
                        expect(res.body.name).to.equal("John Doe");
                        expect(res.body.username).to.equal("john.doe");
                        done(err)
                    });
            });
        });

        describe("the /api/account endpoint", function () {
            it("should return the user account infos", function (done) {
                server.get("/api/account")
                    .set("Authorization", 'Bearer ' + TOKEN)
                    .expect(200)
                    .end(function (err, res) {
                        expect(res.body.balance).to.equal(9920);
                        done(err)
                    });
            });
        });
    }
);