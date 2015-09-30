var express = require("express");
var Datastore = require("nedb");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressJwt = require('express-jwt');
var _SECRET = "secret_a_changer";
var jwt = require('jsonwebtoken');
var _ = require('lodash');

var adb = new Datastore({filename: ".//database/accounts.db", autoload: true});
var fdb = new Datastore({filename: ".//database/friends.db", autoload: true});
var tdb = new Datastore({filename: ".//database/transfers.db", autoload: true});
var udb = new Datastore({filename: ".//database/users.db", autoload: true});


var
  pnum,
  rdisplayswap = /^(none|table(?!-c[ea]).+)/,
  rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
  rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

  cssShow = { position: "absolute", visibility: "hidden", display: "block" },
  cssNormalTransform = {
    letterSpacing: "0",
    fontWeight: "400"
  },

  cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

  // Shortcut for names that are not vendor prefixed
  if ( name in style ) {
    return name;
  }

  // Check for vendor prefixed names
  var capName = name[0].toUpperCase() + name.slice(1),
    origName = name,
    i = cssPrefixes.length;

  while ( i-- ) {
    name = cssPrefixes[ i ] + capName;
    if ( name in style ) {
      return name;
    }
  }

  return origName;
}

function createBaseEach() {
  //TODO: implémenter
}

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(express.static('app'));

/*app.get("/", function (req, res, next) {
 res.status(200).send("Welcome to the Ka-ching Application");
 });*/

app.post('/api/authenticate', function (req, res) {
  if (req.body !== undefined) {
    udb.findOne({username: req.body.login, password: req.body.password}, function (err, profile) {
      if (err || profile === undefined) {
        res.send(401, 'Wrong user or password');
      }
      var token = jwt.sign(profile, _SECRET, {expiresInMinutes: 60 * 5});
      res.json({username: profile.username, token: token});
    })
  }
}); app.get("/api/friends", expressJwt({secret: _SECRET}), function (req, res, next) {
  fdb.find({username: req.user.username}, function (err, docs) {
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

///TODO: refaire l'application, je ne m'en sors plus

app.get('/api/account', expressJwt({secret: _SECRET}), function (req, res, next) {
  adb.find({username: req.user.username}, function (err, docs) {
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

app.get('/api/user', expressJwt({secret: _SECRET}), function (req, res, next) {
  udb.find({username: req.user.username}, function (err, d) {
    if (err) {
      return callback(err);
    }
    if (d === undefined || d.length === 0) {
      res.status(404).send();
      return;
    }
    res.json(d[0]);
  })
});

app.get('/api/friends/:username', expressJwt({secret: _SECRET}), function (req, res, next) {
  fdb.find({username: req.params.username}, function (err, docs) {
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

/**
 * The base implementation of `_.difference` which accepts a single array
 * of values to exclude.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Array} values The values to exclude.
 * @returns {Array} Returns the new array of filtered values.
 */
function baseDifference(array, values) {
  var length = array ? array.length : 0,
    result = [];

  if (!length) {
    return result;
  }
  var index = -1,
    indexOf = getIndexOf(),
    isCommon = indexOf === baseIndexOf,
    cache = (isCommon && values.length >= LARGE_ARRAY_SIZE) ? createCache(values) : null,
    valuesLength = values.length;

  if (cache) {
    indexOf = cacheIndexOf;
    isCommon = false;
    values = cache;
  }
  outer:
    while (++index < length) {
      var value = array[index];

      if (isCommon && value === value) {
        var valuesIndex = valuesLength;
        while (valuesIndex--) {
          if (values[valuesIndex] === value) {
            continue outer;
          }
        }
        result.push(value);
      }
      else if (indexOf(values, value, 0) < 0) {
        result.push(value);
      }
    }
  return result;
}


/**
 * The base implementation of `_.forEach` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object|string} Returns `collection`.
 */
  var baseForOwn, baseForOwnRight;
var baseEach = createBaseEach(baseForOwn);

/**
 * The base implementation of `_.forEachRight` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object|string} Returns `collection`.
 */
var baseEachRight = createBaseEach(baseForOwnRight, true);

app.put('/api/friends', expressJwt({secret: _SECRET}), function (req, res, next) {
  fdb.update({username: req.user.username}, {$push: {friends: {$each: req.body.friends}}}, {upsert: true}, function (err, numReplaced, newDoc) {
    if (err) {
      res.status(400).send();
      return;
    }
















    fdb.find({username: req.user.username}, function (err, docs) {
      res.json(docs[0].friends);
    })
  })
});

app.get('/api/transfers', expressJwt({secret: _SECRET}), function (req, res, next) {
  tdb.find({username: req.user.username}, function (err, docs) {
    var transfers = [];
    _.each(docs[0].transfers, function (transfer) {
      if (!_.isEmpty(transfer.recipient.user)) {
        transfers.push(transfer)
      }
    });
    res.json(transfers);
  });
});

app.get('/api/transfers/:friendUsername', expressJwt({secret: _SECRET}), function (req, res, next) {
  fdb.find({
      username: req.user.username
    },
    function (err, docs) {
      if (err) {
        return callback(err);
      }
      if (docs === undefined || docs.length === 0) {
        res.status(404).send();
        return;
      }











      var friend = _.find(docs[0].friends, function (friend) {
        return friend.user.username === req.params.friendUsername;
      }); tdb.find({
        username: req.user.username
      }, function (err, docs) {
        if (err) {
          return callback(err);
        }
        if (docs === undefined || docs.length === 0) {
          res.status(404).send();
          return;
        } var transfers = [];
        _.each(docs[0].transfers, function (transfer) {
          if (!_.isEmpty(transfer.recipient.user)) {
            if (transfer.recipient.user.name.first === friend.user.name.first &&
              transfer.recipient.user.name.last === friend.user.name.last) {
              transfers.push(transfer)
            }
          }
        });
        res.json(transfers);
      });
    }
  )
});

//TODO: peut-etre qu'avec du TDD rétroactif ça peut être mieux


app.put('/api/transfers', expressJwt({secret: _SECRET}), function (req, res, next) {
  tdb.update({username: req.user.username}, {$push: {transfers: req.body.transfer}}, {upsert: true}, function (err, numReplaced, newDoc) {







    // mise à jour du solde du compte de l'utilisateur courant








    adb.find({username: req.user.username}, function (err, docs) {
      var balance = docs[0].account.balance - req.body.transfer.amount;
      adb.update({username: req.user.username}, {$set: {"account.balance": balance}}, {}, function (err, numReplaced, newDoc) {
        //TODO mettre à jour le solde et la liste des virements du créditeur
        tdb.find({username: req.user.username}, function (err, docs) {
          res.json(docs[0].transfers);
        });
      })
    });
  });
});

app.listen(3000, function () {
  console.info('running on port 3000');
});


/**
 * The base implementation of `_.delay` and `_.defer` which accepts an index
 * of where to slice the arguments to provide to `func`.
 *
 * @private
 * @param {Function} func The function to delay.
 * @param {number} wait The number of milliseconds to delay invocation.
 * @param {Object} args The arguments provide to `func`.
 * @returns {number} Returns the timer id.
 */
function baseDelay(func, wait, args) {
  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  return setTimeout(function() { func.apply(undefined, args); }, wait);
}


/**
 * The base implementation of `_.every` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if all elements pass the predicate check,
 *  else `false`
 */
function baseEvery(collection, predicate) {
  var result = true;
  baseEach(collection, function(value, index, collection) {
    result = !!predicate(value, index, collection);
    return result;
  });
  return result;
}

/**
 * Gets the extremum value of `collection` invoking `iteratee` for each value
 * in `collection` to generate the criterion by which the value is ranked.
 * The `iteratee` is invoked with three arguments: (value, index|key, collection).
 *
 * @private
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} comparator The function used to compare values.
 * @param {*} exValue The initial extremum value.
 * @returns {*} Returns the extremum value.
 */
function baseExtremum(collection, iteratee, comparator, exValue) {
  var computed = exValue,
    result = computed;

  baseEach(collection, function(value, index, collection) {
    var current = +iteratee(value, index, collection);
    if (comparator(current, computed) || (current === exValue && current === result)) {
      computed = current;
      result = value;
    }
  });
  return result;
}

/**
 * The base implementation of `_.fill` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to fill.
 * @param {*} value The value to fill `array` with.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns `array`.
 */
function baseFill(array, value, start, end) {
  var length = array.length;

  start = start == null ? 0 : (+start || 0);
  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = (end === undefined || end > length) ? length : (+end || 0);
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : (end >>> 0);
  start >>>= 0;

  while (start < length) {
    array[start++] = value;
  }
  return array;
}

//TODO: poser sa démission
