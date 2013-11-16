var async = require('async');
var fs = require('fs');
var path = __dirname + '/../data/sequences';
var utils = require("./utils");
var poses = require("./poses");

var CachedResults = null;

exports.clearCache = function(){
  CachedResults = null;
}

exports.sequences = function(req, res){
  var skip = req.query.skip;
  var take = req.query.take;
  var searchString = req.query.searchString;

  if (CachedResults)
  {
    utils.sendResults(res, CachedResults, searchString, skip, take);
  }
  else
  {
    utils.load(path, CachedResults, function(results){
      utils.sendResults(res, results, searchString, skip, take);
    });
  }
};

function sendFullOne(res, results, id) {
  console.log("sendOne: id=" + id);
  var obj = utils.findById(results, id);
  if (obj)
  {
    console.log("sendFullOne: obj=" + obj);
    poses.AddFullPosesAndSend(res, obj, obj.poses);
  }
  else
  {
    res.end();
  }
};

exports.sequence_by_id = function(req, res) {
  var id = req.params.id;
  console.log("sequence_by_id: id=" + id);
  
  if (CachedResults)
  {
    sendFullOne(res, CachedResults, id);
  }
  else
  {
    utils.load(path, CachedResults, function(results){
      sendFullOne(res, results, id);
    });
  }
};
