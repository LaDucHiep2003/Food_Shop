
const Product = require("../../models/product.model")
const filterStatusHelper = require('../../helpers/filterStatus')
const searchStatusHelper = require('../../helpers/search')
const paginationsHelper = require('../../helpers/pagination')
const systemConfig = require('../../config/system')
// [GET] /admin/product
module.exports.index = async (req, res) => {

    const filterStatus = filterStatusHelper(req.query)
    const find = {
        deleted : false
    }

    if(req.query.status){
        find.status = req.query.status
    }

    const objectSearch = searchStatusHelper(req.query)

    if (objectSearch.regex) {
        find.title = objectSearch.regex
    }

    // Paginatin
    const countProducts = await Product.countDocuments(find)

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

    const products = await Product.find(find).sort(sort).limit(objectPagination.limitItems).skip(objectPagination.skip)
    res.render("admin/pages/products/index",{
        pageTitle : "Danh sách sản phẩm",
        products : products,
        filterStatus : filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination
    })
}


// [PATCH] /admin/status/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {

    const status = req.params.status
    const id = req.params.id

    // const updatedBy = {
    //     account_id : res.locals.user.id,
    //     updatedAt : new Date()
    // }

    await Product.updateOne({ _id: id }, { status: status })
    req.flash('success', 'Cập nhật trạng thái thành công');

    res.redirect("back")
}

// [PATCH] /admin/status/change-multi
module.exports.changeMulti = async (req, res) => {
    const type = req.body.type
    const ids = req.body.ids.split(", ")

    // const updatedBy = {
    //     account_id : res.locals.user.id,
    //     updatedAt : new Date()
    // }

    switch (type) {
        case "active":
            await Product.updateMany({ _id: { $in: ids } }, { 
                status: "active" ,
                // $push: { updatedBy : updatedBy}
            })
            req.flash('success', `Cập nhật trạng thái thành công cho ${ids.length} sản phẩm`);
            break;
        case "inactive":
            await Product.updateMany({ _id: { $in: ids } }, { 
                status: "inactive" ,
                // $push: { updatedBy : updatedBy}
            })
            req.flash('success', `Cập nhật trạng thái thành công cho ${ids.length} sản phẩm`);
            break;
        case "delete-all":
            await Product.updateMany({ _id: { $in: ids } }, {
                deleted: true,
                // deletedBy: {
                //     account_id : res.locals.user.id,
                //     deletedAt : new Date()
                // } 

            })
            req.flash('success', `Đã xóa thành công ${ids.length} sản phẩm`);
            break;
        case "change-position":
            for (const item of ids) {
                let [id, position] = item.split("-")

                position = parseInt(position)
                await Product.updateOne({ _id: { $in: id } }, {
                    position: position,
                    // $push: { updatedBy : updatedBy}
                })
            }
            req.flash('success', `Đã đổi vị trí thành công cho ${ids.length} sản phẩm`);
            break;
        default:
            break;
    }
    res.redirect("back")
}

// [DELETE] /admin/delete/:id
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id

    // await Product.deleteOne({_id : id})
    await Product.updateOne({ _id: id }, 
        { 
            deleted: true, 
            // deletedBy: {
            //     account_id : res.locals.user.id,
            //     deletedAt : new Date()
            // } 
        })
    req.flash('success', `Đã xóa thành công sản phẩm`);
    res.redirect("back")
}

// [GET] /admin/products/create
module.exports.create = async (req, res) => {
    let find = {
        deleted: false
    }

    // const category = await ProductCategory.find(find)
    // const newCategory = createTree.tree(category)

    res.render("admin/pages/products/create", {
        pageTitle: "Thêm mới sản phẩm",
        // category : newCategory
    })
}

// [POST] /admin/products/create
module.exports.createPost = async (req, res) => {

    req.body.price = parseInt(req.body.price)
    req.body.discountPercentage = parseInt(req.body.discountPercentage)
    req.body.stock = parseInt(req.body.stock)

    console.log(req.body);

    if (req.body.position == "") {
        const countProducts = await Product.countDocuments()
        req.body.position = countProducts + 1
    } else {
        req.body.position = parseInt(req.body.position)
    }

    // req.body.createdBy = {
    //     account_id : res.locals.user.id
    // }
   
    const product = new Product(req.body)

    await product.save()

    res.redirect(`${systemConfig.prefixAdmin}/products`)
}

// [GET] /admin/products/edit/id
module.exports.edit = async (req, res) => {
    try {
        const find = {
            deleted : false,
            _id : req.params.id
        }
    
        // const category = await ProductCategory.find({
        //     deleted: false
        // })
        // const newCategory = createTree.tree(category)

        const product = await Product.findOne(find)
        res.render("admin/pages/products/edit", {
            pageTitle: "Chỉnh sửa sản phẩm",
            product : product,
            // category : newCategory
        })
    } catch (error) {
        
        res.redirect(`${systemConfig.prefixAdmin}/products`)
    }
    
}

// [PATCH] /admin/products/edit/id
module.exports.editPatch = async (req, res) => {
   
    req.body.price = parseInt(req.body.price)
    req.body.discountPercentage = parseInt(req.body.discountPercentage)
    req.body.stock = parseInt(req.body.stock)



    req.body.position = parseInt(req.body.position)
    try {

        // const updatedBy = {
        //     account_id : res.locals.user.id,
        //     updatedAt : new Date()
        // }

        await Product.updateOne({_id : req.params.id},{
            ...req.body,
            // $push: { updatedBy : updatedBy}
        })
        req.flash('success', 'Cập nhật thành công');
    } catch (error) {
        
    }
   

    res.redirect(`back`)
}


// [GET] /admin/products/detail/id
module.exports.detail = async (req, res) => {
    try {
        const find = {
            deleted : false,
            _id : req.params.id
        }

        const product = await Product.findOne(find)
        res.render("admin/pages/products/detail", {
            pageTitle: product.title,
            product : product
        })
    } catch (error) {
        
        res.redirect(`${systemConfig.prefixAdmin}/products`)
    }
    
}

// [GET] /admin/products/deleted
module.exports.deleted = async (req, res) => {
    const filterStatus = filterStatusHelper(req.query)
    const find = {
        deleted : true
    }

    if(req.query.status){
        find.status = req.query.status
    }

    const objectSearch = searchStatusHelper(req.query)

    if (objectSearch.regex) {
        find.title = objectSearch.regex
    }

    // Paginatin
    const countProducts = await Product.countDocuments(find)

    let objectPagination = paginationsHelper(
        {
            currentPage: 1,
            limitItems: 5
        },
        req.query,
        countProducts
    )
    const products = await Product.find(find).sort({position : "desc"}).limit(objectPagination.limitItems).skip(objectPagination.skip)


    res.render("admin/pages/products/deleted", {
        pageTitle: "Sản phẩm đã xóa",
        products : products,
        filterStatus : filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination
    })
    
}

// [DELETE] /admin/deleted/:id
module.exports.deletedItem = async (req, res) => {
    const id = req.params.id

    // await Product.deleteOne({_id : id})
    await Product.deleteOne({ _id : id})
    req.flash('success', `Đã xóa thành công sản phẩm`);
    res.redirect("back")
}