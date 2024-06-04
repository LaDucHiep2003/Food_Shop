
const ProductCategory = require("../../models/product-category.model")
const systemConfig = require('../../config/system')
const createTree = require("../../helpers/createTree")
const filterStatusHelper = require('../../helpers/filterStatus')
const searchStatusHelper = require('../../helpers/search')
const paginationsHelper = require('../../helpers/pagination')

// [GET] /admin/product-category
module.exports.index = async (req, res) => {

    const filterStatus = filterStatusHelper(req.query)

    let find = {
        deleted: false
    }

    if(req.query.status){
        find.status = req.query.status
    }

    const objectSearch = searchStatusHelper(req.query)

    if (objectSearch.regex) {
        find.title = objectSearch.regex
    }

    // Paginatin
    const countProducts = await ProductCategory.countDocuments(find)

    let objectPagination = paginationsHelper(
        {
            currentPage: 1,
            limitItems: 5
        },
        req.query,
        countProducts
    )

    // End Pagination

    // Sort
    let sort = {

    }
    if(req.query.sortKey && req.query.sortValue){
        sort[req.query.sortKey] = req.query.sortValue
    }
    else{
        sort.position = "desc"
    }
    // End Sort

    const records = await ProductCategory.find(find)
    const newRecords = createTree.tree(records)

    res.render("admin/pages/product-category/index", {
        pageTitle: "Danh mục sản phẩm",
        records: newRecords,
        filterStatus : filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination
    })
}

// [GET] /admin/product-category
module.exports.create = async (req, res) => {
    const find = {
        deleted: false
    }


   
    const records = await ProductCategory.find(find)

    const newRecords = createTree.tree(records)
    res.render("admin/pages/product-category/create", {
        pageTitle: "Tao Danh Muc San Pham",
        records: newRecords,
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