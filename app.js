
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
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(express.bodyParser());
  app.use(express.cookieParser());
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
    var User = db.model('User'); 
    var u = new User();
    u.name = 'Fool';
    u.email = 'nicolas.said@gmail.com';
    u.save(function() {
    User.find().all(function(arr) {
    });
    });

  res.render('index', {
    layout: true,
    title: 'Social7',
    user: u
  });
});

app.get('/lol', function(req, res){
    var User = db.model('User');
    User.find( {}, function(err, usr){
        res.render('lol', {usrarray: usr})
    });
    //res.send('polbak');
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
