var fs = require('fs');
var path = require('path');

var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  // 'Content-Type': "application/json"
  'Content-Type': "text/html"
};

exports.sendResponse = function(res, data, status) {
  status = status || 200;
  res.writeHead(status, headers);
  res.end(data);
};

exports.getFile = function(path, callback) {
  fs.readFile(path, function(err, data) {
    if(err) throw err;
    callback(data);
  });
};

exports.getFormData = function(req, callback){
  var data = "";
  req.on('data', function(partial){
    debugger;
    data += partial;
  });
  req.on('end', function(){
    data = data.replace(/url=/, '');
    callback(data);
  });
};

exports.getSite = function(siteName, callback){
  fs.readFile(path.resolve(__dirname, '../archives/sites/', siteName),
    function(err, data){
      if(err){
      //check if site.txt has site name, if it doesn't, append it
        exports.appendSite(siteName);
      //serve loading.html
        var sitePath = path.resolve(__dirname, './public/loading.html');
        exports.getFile(sitePath, callback);
      }
      //send, actual site
        callback(data);
    });
};


exports.appendSite = function(siteName, callback){
  //check if it exists
  //append if it doesn't
  var sitePath = path.resolve(__dirname, '../archives/sites.txt');
  exports.getFile(sitePath,
    function(data){
      data = data+"";
      debugger;
      // if(typeof data === 'string'){console.log("DATA IS A STRING");}
      if (data.contains(siteName)){
        return true;
      }else{
        fs.appendFile(sitePath, siteName);
      }
    });
};




