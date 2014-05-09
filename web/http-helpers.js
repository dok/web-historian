var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var utils = require('./utils');
var mime = require('mime');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, fileName, failback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...), css, or anything that doesn't change often.)
  // if the file doesn't exist,
  //  404
  fs.readFile('./public' + fileName, function(err, data) {
    if(err) {
      fs.readFile('../archives/sites'+fileName, function(err, data){
        if(err){
          failback();
        }
        data += "";
        utils.sendResponse(res, data, 201);
      });
    }else{
      utils.sendResponse(res, data, 201, mime.lookup(fileName));
    }
  });

};

// As you progress, keep thinking about what helper functions you can put here!
