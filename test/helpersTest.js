var expect = require('chai').expect;
var utils = require('../web/utils');
var helpers = require('../helpers/archive-helpers');


describe('Archive helper tools', function() {
  it('readListofUrls should get all urls in sites.txt and invoke callback with array', function() {
    helpers.readListOfUrls(function(data) {
      var test = ['www.google.com', 'testing.com', 'www.example.com'];
      data.should.be.an('array');
      data.should.equal(test);
    });
  });

  it('isUrlArchived should check if url is archived and invoke callback', function() {
    var item = 'www.news.com';
    var data = '';
    helpers.isURLArchived(item, function(exists){
      if(!exists) {data = 'callback invoked'}
      expect(data).to.equal('callback invoked');
    });
  });

  it('isUrlArchived should not invoke callback if url is is archived', function(){
    var item = 'www.facebook.com';
    var data = '';
    helpers.isURLArchived(item, function(exists){
      if(!exists) data = 'callback invoked';
      expect(data).to.equal('');
    });
  });
});
