const Post = require('../models/post');

// module.exports.ActionNamr = function();
module.exports.home = (req,res)=>{

    Post.find({}).populate('user')
    .populate({
        path : 'comments',
        populate:{
            path : 'user'
        }
    })
    .exec((err,posts)=>{
        return res.render('home',{
            title : "codeial",
            posts : posts
        });
    });

};