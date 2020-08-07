const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.use(new LocalStrategy({
    usernameField:'email'
    },
    (email, password,done)=>{
        User.findOne({email:email},(err,user)=>{
            if(err){
                console.log("error in finding user-->> passport");
                return done(err);
            }
            if(!user || user.password !== password){
                console.log("invalid username or password");
                return done(null,false);
            }
            return done(null,user);
        });
    }
));

//serializing putting user key to be put in the cookie
passport.serializeUser((user,done)=>{
    done(null,user.id);
});
// deserializing getting the user key from the  cookies
passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>{
        if(err){
            console.log("error in finding user-->> passport");
            return done(err);  
        }
        return done(null,user);
    });
});

//check if user is authenticated
passport.checkAuthentication = (req,res,next)=>{
    //if the user is signed in pass on the request to the next function (contoller's action)
    if(req.isAuthenticated()){
        return next();
    }
    // if user not signed in 
    return res.redirect('sign-in');
};

passport.setAuthenticatedUser = (req,res,next)=>{
    if(req.isAuthenticated()){
        //req.user contains the current signed in user and we are just sending it to the locals for the views
        res.locals.user = req.user;
    }
    next();
};

module.exports= passport;