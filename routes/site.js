var helpers = require('../helpers.js');
var User = require('../models/user.js');

module.exports = function(app){
    
    //
    //Retrieve database connection
    //
    var db = app.db;

    //GET - Homepage
    app.get('/', function(req, res) {
  
        //Returns null if user is not logged in
        currentUser = helpers.getCurrentUser(req);

        //If the user is logged in, then display the main page
        if( currentUser != null ){
            res.render('index', {loggedUser : currentUser});
        }
        //
        //else display the login page
        else{
            res.redirect('/login');
        }
    });
}
