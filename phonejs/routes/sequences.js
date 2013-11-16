var async = require('async');
var fs = require('fs');
var path = __dirname + '/../data/sequences';
var CachedResults = null;

function readJsonAsync(file, callback) {
  console.log('readJsonAsync file: ' + file);
  fs.readFile(path + '/' + file, 'utf8', function(err, data){
    if (err){
      console.log('readFile  error: ' + err + ' path: ' + path);
      return;
    }
    
    //console.log('data: ' + data);
    var json = JSON.parse(data);
    callback(err, json);
  });
};

var sendResults = function(res, theResults, searchString, skip, take) {
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

load = function(callback) {
  fs.readdir(path, function(err, files) {
    if (err){
      console.log('readdir error: ' + err + ' path: ' + path);
      return;
    }

    var jsonFiles = files.filter(function(v){ return /\.json/.test(v); });
    jsonFiles.sort();
    async.map(jsonFiles, readJsonAsync, function(err, results) {
      // results = ['file 1 content', 'file 2 content', ...]
      CachedResults = results;
      console.log("load: " + CachedResults.length);
      callback();
    });
  });
};

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
    load(function(){
      sendResults(res, CachedResults, searchString, skip, take);
    });
  }
};

function findById(source, id) {
  for (var i = 0; i < source.length; i++) {
    if (source[i].id == id) {
      return source[i];
    }
  }
  
  return null;
}

sendOne = function(res, results, id) {
  console.log("sendOne: id=" + id);
  var obj = findById(results, id);
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
    load(function(){
      sendOne(res, CachedResults, id);
    });
  }
};
