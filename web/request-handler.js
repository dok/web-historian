var path = require('path');
var utils = require('./utils');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var httpHelper = require('./http-helpers.js');
// require more modules/folders here!

// var handleGet = function()

var getIndex = function(req, res) {
  utils.getFile(path.resolve(__dirname, './public/index.html'), function(data) {
    utils.sendResponse(res, data, 200);
  });
};

var postSite = function(req, res) {
  utils.getFormData(req, function(data){ //siteName
    //if data matches an item in archives, then we'll return it
    //else
      //append to sites.txt if not already there
      //send loading.html as the response
    // console.log()
    //
    //
    utils.appendSite(data);
    fs.exists('../archives/sites/'+data, function(exists){
      if(exists){
        utils.sendRedirect(res, data);
      }else{
        utils.sendRedirect(res, 'loading.html');
      }
    });
  });
};

var methods = {
  'GET': getIndex,
  'POST': postSite
};

exports.handleRequest = function (req, res) {
    var method = methods[req.method];
    if(method){
      method(req, res);
    } else {
      // res.end('404 ERROR');
      utils.sendResponse(res, '404 ERROR', 404);
    }
};

exports.handleLoader = function (req, res) {
  httpHelper.serveAssets(res, "/loading.html", function(){
    utils.sendResponse(res, "404 Page Doesn't Exist", 404);
  });
};
