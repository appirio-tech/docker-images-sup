
var fs = require('fs');
var data = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));

var return404 = function(res) {
  res.setHeader('Content-Type', 'application/json');
  res.status(404);
  res.json({
    "id": "-d1eec1c:151c946bf36:-5d5f",
    "result": {
      "success": true,
      "status": 404,
      "metadata": null,
      "content": "Resource Not found"
    },
    "version": "v3"
  });
}

var returnData = function(res, data) {
  res.setHeader('Content-Type', 'application/json');
  res.json({
      "id": "23bd6312:14e1d778bb9:-7fff",
      "result": {
        "success": true,
        "status": 200,
        "metadata": null,
        "content": data
      }
    });
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
app.set("json spaces", 2);
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router
// simple logger for this router's requests
// all requests to this router will first hit this middleware
router.use(function(req, res, next) {
  console.log('%s %s %s', req.method, req.url, req.path);
  next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
  returnData(res, {
    message: 'hooray! welcome to our api!'
  });
});
router.get('/members/', function(req, res) {
  returnData(res, data.members);
});

router.get('/users/', function(req, res) {
  returnData(res, data.users);
});

router.get('/challenges/', function(req, res) {
  returnData(res, data.challenges);
});

router.get('/members/:handle', function(req, res) {
  var respData = _.find(data.members, function(m) {return req.params["handle"] === m.handle});
  respData ? returnData(res, respData): return404(res);
})

router.get('/challenges/:id', function(req, res) {
  var respData = _.find(data.challenges, function(m) {return req.params["id"] == m.id});
  respData ? returnData(res, respData): return404(res);;
})

router.get('/users/:id', function(req, res) {
  var respData = _.find(data.users, function(m) {return req.params["id"] == m.id});
  respData ? returnData(res, respData): return404(res);
})

router.get('/members/:handle/challenges/', function(req, res) {
  var cid =req.query.filter.split("=")[1];
  var respData = _.find(data.challenges, function(m) {return cid == m.id});
  respData ? returnData(res, respData): return404(res);  
})

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/v3', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
