
/**
 * Module dependencies.
 */

var express = require('express');
var sys = require("sys");
var fs = require("fs");
var formidable = require('formidable');

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
    console.log('starting upload');

    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        /*
        res.writeHead(200, {'content-type': 'text/plain'});
        res.write('received upload:\n\n');
        res.end(sys.inspect({fields: fields, files: files}));
        */
        var uploaded_file = sys.inspect(files['uploaded_floorlpan']['path'])
        fs.writeFile("/tmp/data.uploaded_file.txt", uploaded_file, function(err) {
            if(err) { sys.puts(err); }
        });
        console.log(">>>>>>>" + uploaded_file);
    });
    console.log('upload done');
    res.redirect('/');
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
