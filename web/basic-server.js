var http = require("http");
var urlParser = require('url');
var handler = require("./request-handler").handleRequest;
var helpers = require('./http-helpers');

var port = 8080;
var ip = "127.0.0.1";

var routes = {
  '/index.html': handler,
  '/'     : handler,
  '/loading.html': handler
};

var server = http.createServer(function(req, res) {
  var url = urlParser.parse(req.url);
  var route = routes[url.pathname];
  debugger;
  if( route ){
    route(req, res);
  } else {
    //serve assets
    debugger;
    helpers.serveAssets(res, url.pathname, function() {
      res.end('NOT FOUND 404');
    });
  }

});

console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);
