var express = require('express');
var jsonServer = require('json-server');
var bodyParser = require('body-parser');

var PORT = process.argv[2] || 3000;
var dbPath = process.argv[3] || "db.json";
// APP

// Returns an Express server
var server = jsonServer.create();
server.use(bodyParser.json());

// Set default middlewares (logger, static, cors and no-cache)
server.use(jsonServer.defaults())
var router = jsonServer.router(dbPath);
// wrap in content property
router.render = function(req, res) {
  console.log(res.statusCode)

  if (res.statusCode === 200) {
    if (req.path.indexOf("users") > 0) {
      // remove id
      res.locals.data.id = res.locals.data.id.toString();
    }
    res.jsonp({
      "id": "23bd6312:14e1d778bb9:-7fff",
      "result": {
        "success": true,
        "status": 200,
        "metadata": null,
        "content": res.locals.data
      }
    });
  } else {
    res.json({
      "id": "-d1eec1c:151c946bf36:-5d5f",
      "result": {
        "success": true,
        "status": 404,
        "metadata": null,
        "content": "Resource Not found"
      },
      "version": "v3"
    })
  }

};

//handle v3/ files endpoint
server.post('/v3/files/uploadurl', function(req, res) {
  res.json({
    "id": "23bd6312:14e1d778bb9:-7fff",
    "result": {
      "success": true,
      "status": 200,
      "metadata": null,
      "content": {
        "filePath": req.body.param.filePath,
        "preSignedURL": "https://sandbox-temp-bucket.s3.amazonaws.com/files/" + req.body.param.filePath,
        "contentType": req.body.param.contentType,
        "public": true
      }
    },
    "version": "v3"
  });
});

server.use('/v3/', router)
server.use(jsonServer.rewriter({
  '/members/:handle/:resource/?filter=id%3D:id': '/:resource/:id'
}));

console.log("Starting Mock Server.... ");
console.log("PORT: " + PORT);

server.listen(PORT);
