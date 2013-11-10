var async = require('async');
var fs = require('fs');
var path = __dirname + '/../data/sequences';

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

console.log("seq: path: " + path);

exports.sequences = function(req, res){
  var skip = req.query.skip;
  var take = req.query.take;
  var searchString = req.params.searchString;

  fs.readdir(path, function(err, files) {
    if (err){
      console.log('readdir error: ' + err + ' path: ' + path);
      return;
    }

    var jsonFiles = files.filter(function(v){ return /\.json/.test(v); });
    jsonFiles.sort();
    jsonFiles.splice(0, skip);
    jsonFiles = jsonFiles.slice(0, take);
    console.log('skip: ' + skip + ' take: ' + take + ' jsonFiles.length: ' + jsonFiles.length);

    async.map(jsonFiles, readJsonAsync, function(err, results) {
      // results = ['file 1 content', 'file 2 content', ...]
      res.send(results);
      //res.end();
    });
    
  });

  //res.render('index', { title: 'Express' });
};


exports.sequence_by_id = function(req, res){
  var id = req.params.id;
  //res.render('index', { title: 'Express' });
};

