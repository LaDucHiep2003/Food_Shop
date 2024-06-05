
const Role = require("../../models/role.model")
const systemConfig = require('../../config/system')


// [GET] /admin/role
module.exports.index = async (req, res) => {

    let find = {
        deleted : false
    }

    const records = await Role.find(find)
    res.render("admin/pages/roles/index",{
        pageTitle : "Nhóm quyền",
        records : records
    })
}

// [GET] /admin/role/create
module.exports.create = async (req, res) => {

    
    res.render("admin/pages/roles/create",{
        pageTitle : "Tạo nhóm quyền",
    })
}

// [POST] /admin/role/create
module.exports.createPost = async (req, res) => {

    const record = new Role(req.body)
    await record.save()


    res.redirect(`${systemConfig.prefixAdmin}/roles`)
}

// [GET] /admin/role/edit
module.exports.edit = async (req, res) => {
    try{
        const id = req.params.id

        let find = {
            _id : id,
            deleted : false
        }

        const data = await Role.findOne(find)

        res.render("admin/pages/roles/edit",{
            pageTitle : "Chỉnh sửa nhóm quyền",
            data : data
        })
    }catch(error){
        res.redirect(`${systemConfig.prefixAdmin}/roles`)
    }
    
}

// [POST] /admin/role/edit/:id
module.exports.editPatch = async (req, res) => {
    try{
        const id = req.params.id


        await Role.updateOne({_id : id},req.body)
        req.flash("success","Cập nhật thành công")

        
    }catch(error){
        req.flash("error","Cập nhật không thành công")
    }
    res.redirect(`back`)
}

// [GET] /admin/roles/permissions
module.exports.permissions = async (req, res) => {

    let find = {
        deleted : false
    }

    const records = await Role.find(find)
    res.render("admin/pages/roles/permissions",{
        pageTitle : "Phân quyền",
        records : records
    })
}

// [PATCH] /admin/permissions
module.exports.permissionsPatch = async (req, res) => {

    const permissions = JSON.parse(req.body.permissions)
    for (const item of permissions) {
        const id = item.id
        const permissions = item.permissions
        await Role.updateOne({_id : id},{permissions : permissions})
    }

    req.flash("success","Cập nhật thành công")
    res.redirect("back")
}