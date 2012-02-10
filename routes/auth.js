var md5 = require('md5');
var User = require('../models/user.js');

module.exports = function(app){
    
    //
    //Retrieve database connection
    //
    var db = app.db;

    //GET - User login
    app.get('/login', function(req, res) {
        res.render('login', { layout: 'layout_auth' });
    });

    //GET - User logout
    app.get('/logout', function(req, res) {
        req.session.destroy(function() {
            res.redirect('/');
        });
    });

    //POST - User login
    app.post('/login', function(req, res) {

        //retrieve form values
        var formEmail =     req.body.email;
        var formPassword =  md5.digest_s(req.body.password);

        //Query db
        var User = db.model('User');
        User.find({ 'email' : formEmail, 'hashed_password' : formPassword }, function(err, usr){
            if( err == null && usr.length != 0 )
            {
                var loggedUser = usr;
                req.session.user = loggedUser;
                res.redirect('/');
            }
            else
            {
                res.render('error', {errormsg: 'Wrong email or password...'});
            }
        });
    });

    //GET - User registration
    app.get('/register', function(req, res){
        res.render('register', {layout: 'layout_auth'} );
    });

    //POST - User registration
    app.post('/register', function(req, res){
        
        var usr = new User;
        usr.name = req.body.username;
        usr.password = req.body.password;
        usr.email = req.body.email;
        usr.registered = false;

        usr.save( function(err){
            //console.log(err);
            if( err != null ){
                if( err.code == 11000 )
                {
                    res.render('error', {errormsg : 'Email already registered!', layout:'layout_auth'});
                }
            }
            else{
                res.redirect('/');
            }
        });
    });
}
