var async = require('async');
var fs = require('fs');
var path = __dirname + '/../data/poses';
var utils = require("./utils");

var CachedResults = null;

exports.clearCache = function(){
  CachedResults = null;
}

exports.poses = function(req, res){
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

exports.poses_by_id = function(req, res){
  var id = req.params.id;
  console.log("poses_by_id: id=" + id);
  
  if (CachedResults)
  {
    utils.sendOne(res, CachedResults, id);
  }
  else
  {
    utils.load(path, CachedResults, function(results){
      utils.sendOne(res, results, id);
    });
  }
};

function filterByList(results, ids){
  var res = [];
  for (var i = 0; i < results.length; i++) {
    var result = results[i];
    if (ids.indexOf(result.id) >=0) {
      res.push(result);
    }
  }
  return res;
}

exports.AddFullPosesAndSend = function(res, obj, ids) {
  if (CachedResults)
  {
    obj.fullPoses = filterByList(CachedResults, ids);
    res.send(obj);
  }
  else
  {
    utils.load(path, CachedResults, function(results){
      obj.fullPoses = filterByList(results, ids);
      res.send(obj);
    });
  }
};
