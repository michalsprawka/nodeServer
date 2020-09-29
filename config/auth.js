module.exports = {
    ensureAuthenticated : function(req,res,next) {
        if(req.isAuthenticated()) {
            return next();
        }
        req.flash('error_msg' , 'please login to view this resource');
        res.redirect('/users/login');
    },

    ensureIsAdmin : function(req,res,next) {
        console.log("USER IN ENSURE ADMIN: ",req.user.isAdmin)
        if(req.isAuthenticated() && req.user.isAdmin ){
            return next();
        }
        req.flash('error_msg' , 'please login to view this resource as admin');
        res.redirect('/users/login');
    }
}