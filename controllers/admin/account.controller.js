
const Account = require("../../models/account.model")
const systemConfig = require('../../config/system')
const Role = require("../../models/role.model")

const md5 = require('md5');

// [GET] /admin/accounts
module.exports.index = async (req, res) => {
    let find = {
        deleted : false
    }

    const records = await Account.find(find).select("-passWord -token")

    for (const record of records) {
        const role = await Role.findOne({
            _id : record.role_id,
            deleted : false
        })
        record.role = role
    }

    res.render("admin/pages/accounts/index",{
        pageTitle : "Danh sách tài khoản",
        records : records
    })
}


// [GET] /admin/accounts
module.exports.create = async (req, res) => {
    const find = {
        deleted : false
    }

    const roles = await Role.find(find)
   
    res.render("admin/pages/accounts/create",{
        pageTitle : "Tạo tài khoản",
        roles : roles
    })
}

// [POST] /admin/accounts
module.exports.createPost = async (req, res) => {
    const emailExits = await Account.findOne({
        email : req.body.email,
        deleted : false
    })

    if(emailExits){
        req.flash("error","Email đã tồn tại")
        res.redirect("back")
    }
    else{
        req.body.passWord = md5(req.body.passWord)
   
        const record = new Account(req.body)
        await record.save()

        res.redirect(`${systemConfig.prefixAdmin}/accounts`)
    }
    
}