var express = require("express");
var Datastore = require("nedb");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressJwt = require('express-jwt');
var _SECRET = "secret_a_changer";
var jwt = require('jsonwebtoken');

var accountsDB = new Datastore({filename: ".//database/accounts.db", autoload: true});
var friendsDB = new Datastore({filename: ".//database/friends.db", autoload: true});
var usersDB = new Datastore({filename: ".//database/users.db", autoload: true});

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());


app.get("/", function (req, res, next) {
  res.status(200).send("Welcome to the Ka-ching Application");
});
//app.get("/home", appController.getHomePage);

app.post('/authenticate', function (req, res) {
  if (req.body !== undefined) {
    usersDB.findOne({username: req.body.login, password: req.body.password}, function (err, profile) {
      if (err || profile === undefined) {
        res.send(401, 'Wrong user or password');
      }
      var token = jwt.sign(profile, _SECRET, {expiresInMinutes: 60 * 5});
      res.json({username: profile.username, token: token});
    })
  }
});

app.get("/api/friends", expressJwt({secret: _SECRET}), function (req, res, next) {
  friendsDB.find({username: req.user.username}, function (err, docs) {
    if (err) {
      return callback(err);
    }
    if (docs === undefined || docs.length === 0) {
      res.status(404).send();
      return;
    }
    res.json(docs[0].friends);
  })
});

app.get('/api/account', expressJwt({secret: _SECRET}), function(req, res, next){
  accountsDB.find({username: req.user.username}, function (err, docs) {
    if (err) {
      return callback(err);
    }
    if (docs === undefined || docs.length === 0) {
      res.status(404).send();
      return;
    }
    res.json(docs[0].account);
  })
});

app.get('/api/user', expressJwt({secret: _SECRET}), function(req, res, next){
  usersDB.find({username: req.user.username}, function (err, docs) {
    if (err) {
      return callback(err);
    }
    if (docs === undefined || docs.length === 0) {
      res.status(404).send();
      return;
    }
    res.json(docs[0]);
  })
});

app.listen(3000, function () {
  console.info('running on port 3000');
});
