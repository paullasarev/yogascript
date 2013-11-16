var async = require('async');
var fs = require('fs');
var path = __dirname + '/../data/sequences';
var CachedResults = null;

exports.readJsonAsync = function(file, callback) {
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

exports.load = function (cachedResults, callback) {
  fs.readdir(path, function(err, files) {
    if (err){
      console.log('readdir error: ' + err + ' path: ' + path);
      return;
    }

    var jsonFiles = files.filter(function(v){ return /\.json/.test(v); });
    jsonFiles.sort();
    async.map(jsonFiles, exports.readJsonAsync, function(err, results) {
      // results = ['file 1 content', 'file 2 content', ...]
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

