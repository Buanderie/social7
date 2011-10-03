
/**
 * Module dependencies.
 */

var express = require('express');
var app = module.exports = express.createServer();

/*
 * Database shit
*/
mongoose = require('mongoose');
db = mongoose.connect('mongodb://localhost/social7');
require('./models/user.js');

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
    var User = db.model('Fuck'); 
    var u = new User();
    u.name = 'Fool';
    u.email = 'nicolas.said2@gmail.com';
    u.save(function() {
    User.find().all(function(arr) {
    });
    });

  res.render('index', {
    title: 'Express'
  });
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
