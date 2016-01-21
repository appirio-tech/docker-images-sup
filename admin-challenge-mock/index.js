
var fs = require('fs');
var data = JSON.parse(fs.readFileSync('db.json', 'utf8'));

var return404 = function() {
  return {
    "id": "-d1eec1c:151c946bf36:-5d5f",
    "result": {
      "success": true,
      "status": 404,
      "metadata": null,
      "content": "Resource Not found"
    },
    "version": "v3"
  };
}

var returnData = function(data) {
    return {
      "id": "23bd6312:14e1d778bb9:-7fff",
      "result": {
        "success": true,
        "status": 200,
        "metadata": null,
        "content": data
      }
    };
  }
  // server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');
var _ = require('lodash');
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
  res.json({
    message: 'hooray! welcome to our api!'
  });
});
router.get('/members/', function(req, res) {
  res.json(data.members);
});

router.get('/users/', function(req, res) {
  res.json(data.users);
});

router.get('/challenges/', function(req, res) {
  res.json(data.challenges);
});

router.get('/members/:handle', function(req, res) {
  console.log(req.params);
  var member = _.find(data.members, function(m) {return req.params["handle"] === m.handle});
  if (member) {
    res.json(returnData(member));
  } else {
    res.json(return404());
  }
})

router.get('/challenges/:id', function(req, res) {
  var member = _.find(data.challenges, function(m) {return req.params["id"] == m.id});
  if (member) {
    res.json(returnData(member));
  } else {
    res.json(return404());
  }
})

router.get('/users/:id', function(req, res) {
  var member = _.find(data.users, function(m) {return req.params["id"] === m.id});
  if (member) {
    res.json(returnData(member));
  } else {
    res.json(return404());
  }
})

router.get('/members/:handle/challenges/', function(req, res) {
  console.log(req.query);
  var cid =req.query.filter.split("=")[1];
  console.log(cid);
  var member = _.find(data.challenges, function(m) {return cid == m.id});
  if (member) {
    res.json(returnData(member));
  } else {
    res.json(return404());
  }
})

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/v3', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
