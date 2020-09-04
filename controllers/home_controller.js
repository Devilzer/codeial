const Post = require('../models/post');

// module.exports.ActionNamr = function();
module.exports.home = (req,res)=>{

    Post.find({}).populate('user').exec((err,posts)=>{
        return res.render('home',{
            title : "codeial",
            posts : posts
        });
    });

};