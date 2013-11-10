
/**
 * Module dependencies.
 */

var express = require('express')
  //, routes = require('./routes')
  , seq = require('./routes/sequences')
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

app.get('/api/sequences', seq.sequences);
app.get('/api/sequences/:id', seq.sequence_by_id);

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
