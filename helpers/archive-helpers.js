var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');
var url = require('url');
var request = require('request');
var utils = require('../web/utils');
/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){
  // Read sites.txt
  // create array from splitting the lines on newline
  utils.getFile(exports.paths['list'], function(data) {
    //split them at every new line
    data = data+"";
    data = data.split('\n');
    debugger;
    callback(data);
  });
};

exports.isURLArchived = function(item, callback){
  // Check to see if a URL has already been archived in archives/sites
  //see if file exists
  var path = exports.paths['archivedSites'] + '/' + item;
  fs.exists(path, function(exists){
    debugger;
      callback(item, exists);
    });
};


exports.downloadUrls = function(siteName, callback){
  request(siteName, function (error, response, body){
    if (!error && response.statusCode == 200) {
      callback(siteName, body);
      console.log(body); // Print the google web page.
    }
  });
};


exports.createFile = function(fileName, path, data){
  fs.writeFile(path+'/'+url.parse(fileName).hostname, data, function(err){
    if(err) throw err;
    console.log("New Archive File Saved!");
  });
};




