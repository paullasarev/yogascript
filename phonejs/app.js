
/**
 * Module dependencies.
 */

var express = require('express')
  //, routes = require('./routes')
  , sequences_route = require('./routes/sequences')
  , poses_route = require('./routes/poses')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/api/sequences', sequences_route.sequences);
app.get('/api/sequences/:id', sequences_route.sequence_by_id);
app.get('/api/poses', poses_route.poses);
app.get('/api/poses/:id', poses_route.poses_by_id);

//app.get('/api/poses', seq.poses);

// app.get('/api/articles/:id', function(req, res) {
    // return ArticleModel.findById(req.params.id, function (err, article) {
    
// app.get('/api/sequences', function(req, res) {
    // res.send('This is not implemented now');
// });

//app.get('/index', routes.index);
//app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
