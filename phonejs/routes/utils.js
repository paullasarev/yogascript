var async = require('async');
var fs = require('fs');
//var path = __dirname + '/../data/sequences';
var CachedResults = null;

exports.readJsonAsync = function(file, callback) {
  console.log('readJsonAsync file: ' + file);
  fs.readFile(file, 'utf8', function(err, data){
  //fs.readFile(path + '/' + file, 'utf8', function(err, data){
    if (err){
      console.log('readFile  error: ' + err + ' file: ' + file);
      return;
    }
    
    //console.log('data: ' + data);
    var json = JSON.parse(data);
    callback(err, json);
  });
};

function compareName(a, b) {
  if (a.name < b.name)
     return -1;
  if (a.name > b.name)
    return 1;
  return 0;
}


exports.load = function (path, cachedResults, callback) {
  fs.readdir(path, function(err, files) {
    if (err){
      console.log('readdir error: ' + err + ' path: ' + path);
      return;
    }

    var jsonFiles = files.filter(function(v){ return /\.json/.test(v); });
    //jsonFiles.sort(compareName);
    var jsonPaths = [];
    for (var i = 0; i < jsonFiles.length; i++) {
      jsonPaths.push(path + '/' + jsonFiles[i]);
    }
    async.map(jsonPaths, exports.readJsonAsync, function(err, results) {
      // results = ['file 1 content', 'file 2 content', ...]
      results.sort(compareName);
      cachedResults = results;
      console.log("load: " + cachedResults.length);
      callback(results);
    });
  });
};

exports.findById = function (source, id) {
  for (var i = 0; i < source.length; i++) {
    if (source[i].id == id) {
      return source[i];
    }
  }
  
  return null;
};

exports.sendResults = function(res, theResults, searchString, skip, take) {
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

exports.sendOne = function(res, results, id) {
  console.log("sendOne: id=" + id);
  var obj = exports.findById(results, id);
  if (obj)
  {
    console.log("sendOne: obj=" + obj);
    res.send(obj);
  }
  else
    res.end();
};


