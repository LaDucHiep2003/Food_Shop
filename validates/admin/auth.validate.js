
module.exports.loginPost = (req,res,next) =>{
    if(!req.body.email){
        req.flash("error","Vui lòng nhập Email")
        res.redirect("back")
        return;
    }

    if(!req.body.passWord){
        req.flash("error","Vui Lòng nhập mật khẩu")
        res.redirect("back")
        return;
    }
    next()
}