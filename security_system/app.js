
/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyDecoder());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.staticProvider(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', function(req, res){
  res.render('index', {
    locals: {
      title: 'Express'
    }
  });
});

app.get('/upload', function(req, res){
  res.render('upload', {
    locals: {
      title: 'Express'
    }
  });
});

app.post('/do_upload', function(req, res){
    console.log('do the damn upload');
});

app.get('/design', function(req, res){
  res.render('design', {
    locals: {
      title: 'Express'
    }
  });
});

app.get('/monitor', function(req, res){
  res.render('monitor', {
    locals: {
      title: 'Express'
    }
  });
});



// Only listen on $ node app.js

if (!module.parent) {
  app.listen(3000);
  console.log("Express server listening on port %d", app.address().port)
}
