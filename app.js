
/**
 * Module dependencies.
 */
var express = require('express');
var SessionMongoose = require("session-mongoose");

var app = module.exports = express.createServer();

/*
 * Database shit
*/
    //Connect to MongoDB
    mongoose = require('mongoose');
    app.db = mongoose.connect('mongodb://localhost/social7');
    //Define schemas
    require('./models/user.js');
/*
 *
 */

//
// Configuration
//
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  var pub = __dirname + '/public';
  app.use(express.compiler({ src: pub, enable: ['less'] }));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
       
  //Session mgmt
  //Using mongoDB as a session store...
  var mongooseSessionStore = new SessionMongoose({
    url: "mongodb://localhost/session",
    interval: 60000
  });
  app.use(express.cookieParser());
  app.use(express.session({secret: "allyourbase", store: mongooseSessionStore}));
  //
  
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

//
// Routes
//
require( './routes/site.js')(app);
require( './routes/auth.js')(app);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
