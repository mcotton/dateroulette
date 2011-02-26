
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

app.get('/signup', function(req, res){
  res.render('signup', {
    locals: {
      title: 'Signup'
    }
  });
});

app.get('/signup_submit', function(req, res){
  res.render('signup_submit', {
    locals: {
      title: 'Signup '
    }
  });
});

app.get('/demo', function(req, res)  {
    res.render('demo', {
        locals: {
            title: 'Demo'
        }
    });
});

// Only listen on $ node app.js

if (!module.parent) {
  app.listen(3000);
  console.log("Express server listening on port %d", app.address().port)
}
