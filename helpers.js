exports.getCurrentUser = function getCurrentUser(req)
{
    //Check if the user is logged in
    var currentUser = null;
    if( req.session.user != undefined )
        currentUser = req.session.user[0];

    return currentUser;
}
