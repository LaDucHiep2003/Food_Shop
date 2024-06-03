
const ProductCategory = require("../../models/product-category.model")
const systemConfig = require('../../config/system')
const createTree = require("../../helpers/createTree")

// [GET] /admin/product-category
module.exports.index = async (req, res) => {

    // let find = {
    //     deleted: false
    // }


    // const records = await ProductCategory.find(find)
    // const newRecords = createTree.tree(records)

    res.render("admin/pages/product-category/index", {
        pageTitle: "Trang Danh Muc San Pham",
        // records: records
    })
}

// [GET] /admin/product-category
module.exports.create = async (req, res) => {
    const find = {
        deleted: false
    }


   
    const records = await ProductCategory.find(find)

    const newRecords = createTree.tree(records)
    // console.log(newRecords);
    res.render("admin/pages/product-category/create", {
        pageTitle: "Tao Danh Muc San Pham",
        records: newRecords
    })
}

// [POST] /admin/product-category/create

module.exports.createPost = async (req, res) => {

    
    if (req.body.position == "") {
        const countProducts = await ProductCategory.countDocuments()
        req.body.position = countProducts + 1
    } else {
        req.body.position = parseInt(req.body.position)
    }
    
    const record = new ProductCategory(req.body)
    
    await record.save()
    
    res.redirect(`${systemConfig.prefixAdmin}/products-category`)
    
}