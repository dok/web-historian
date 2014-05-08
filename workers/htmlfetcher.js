// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.

var helper = require('../helpers/archive-helpers');

var fetchSite = function(siteName) {
  var regex = /^http:\/\//;

  if(siteName.match(regex) === null){
    siteName = "http://" + siteName;
  }
  helper.downloadUrls(siteName);

};


