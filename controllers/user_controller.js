const User = require('../models/user');

//render profile page
module.exports.profile = (req,res)=>{
    return res.render('profile',{
        title:"Codiel | Profile"
    });
};

//render user signin page
module.exports.signIn = (req,res)=>{
    if(req.isAuthenticated()){
        return res.redirect('profile');
    }
    return res.render('user_sign_in',{
        title:"Codiel | SignIN"
    });
};

//render user sign up page
module.exports.signUp = (req,res)=>{
    if(req.isAuthenticated()){
        return res.redirect('profile');
    }
    return res.render('user_sign_up',{
        title:"Codiel | SignUP"
    });
};

//sign up function
module.exports.createUser = (req,res)=>{
    if(req.body.password!=req.body.confirm_password)
    {
       return res.redirect('back');
    }
    User.findOne({email:req.body.email},(err,user)=>{
        if(err){
            console.log("error in finding user in signing up");
            return;
        }
        if(!user){
            User.create(req.body,(err,user)=>{
                if(err){
                    console.log("error in creating user");
                    return;
                }
                return res.redirect('sign-in');
            });
        }
        else{
            return res.redirect('back');
        }
    });

};

//sign in function
module.exports.createSession = (req,res)=>{

   return res.redirect('/user/profile');
    
    
};
// sign-out function
module.exports.terminateSession = (req,res)=>{
    req.logout();
    return res.redirect('/');
};