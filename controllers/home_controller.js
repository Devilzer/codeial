// module.exports.ActionNamr = function();
module.exports.home = (req,res)=>{
    console.log(req.cookies);
    res.cookie('abs',24);
    return res.render('home',{
        title : "codeial"
    });
};