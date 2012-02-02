var helpers = require('../helpers.js');
var User = require('../models/user.js');

module.exports = function(app){
    
    //
    //Retrieve database connection
    //
    var db = app.db;

    //GET - Display Own profile ?
    app.get('/user/self', function(req, res) {
  
        //Returns null if user is not logged in
        currentUser = helpers.getCurrentUser(req);

        //Render the index page
        res.render('index', {loggedUser : currentUser });
    });

    //POST - Own profile Update ?
    app.post('/user/self', function(req, res){
        
    });

    //Get - Other profile
    app.get('/user/:id', function(req, res){

    });
}
