// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.

var helper = require('../helpers/archive-helpers');

var fetchSites = function() {
  //get the list of urls
  helper.readListOfUrls(function(list) {
    //for each item in list,
    for(var i = 0; i < list.length; i++) {
      var item = list[i];
      //check if is archived
      helper.isUrlArchived(item, function(isArchived){
        var regex = /^http:\/\//;
        //if is not archived, then scrape page
        if(!isArchived) {
          //make sure has prefix of 'http://'
          if(item.match(regex) === null){
            var urlPath = "http://" + item;
          }
          //download the item
          helper.downloadUrls(urlPath, function(body){
            //create a file and add the body
            helper.createFile(item, helper.paths.archivedSites, body);
          });
        }
      });
    }
  });
};

fetchSites();
