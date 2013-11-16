var async = require('async');
var fs = require('fs');
var path = __dirname + '/../data/sequences';
var utils = require("./utils");

var CachedResults = null;

function sendResults(res, theResults, searchString, skip, take) {
  var results = theResults.slice(0);
  if (searchString)
  {
    results = results.filter(function(v){ 
      var name = v.name.toLowerCase();
      return name.search(searchString.toLowerCase()) >= 0;
    });
  }
    
  results = results.splice(skip, take);
  console.log('skip: ' + skip + ' take: ' + take + ' searchString: ' + searchString + ' results.length: ' + results.length);
    
  res.send(results);
};

exports.clearCache = function(){
  CachedResults = null;
}

exports.sequences = function(req, res){
  var skip = req.query.skip;
  var take = req.query.take;
  var searchString = req.query.searchString;

  if (CachedResults)
  {
    sendResults(res, CachedResults, searchString, skip, take);
  }
  else
  {
    utils.load(CachedResults, function(results){
      sendResults(res, results, searchString, skip, take);
    });
  }
};

sendOne = function(res, results, id) {
  console.log("sendOne: id=" + id);
  var obj = utils.findById(results, id);
  if (obj)
  {
    console.log("sendOne: obj=" + obj);
    res.send(obj);
  }
  else
    res.end();
};

exports.sequence_by_id = function(req, res){
  var id = req.params.id;
  console.log("sequence_by_id: id=" + id);
  
  if (CachedResults)
  {
    sendOne(res, CachedResults, id);
  }
  else
  {
    utils.load(CachedResults, function(results){
      sendOne(res, results, id);
    });
  }
};
