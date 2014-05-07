var path = require('path');
var utils = require('./utils');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!

// var handleGet = function()

var getIndex = function(req, res) {
  utils.getFile('./public/index.html', function(data) {
    utils.sendResponse(res, data, 200);
  });
};

var postSite = function(req, res) {

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
      res.end('404 ERROR');
    }
};

