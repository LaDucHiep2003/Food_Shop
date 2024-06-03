
const Product = require("../../models/product.model")

// [GET] /product
module.exports.index = async (req, res) => {
    const products = await Product.find({
        status : "active",
        deleted : false
    }).sort({position : "desc"})

    res.render("client/pages/products/index",{
        pageTitle : "Danh sách sản phẩm",
        products : products
    })
}

// [GET] /product/:slug
module.exports.detail = async (req, res) => {
    try {
        const find = {
            deleted : false,
            slug: req.params.slugProduct,
            status : "active"
        }
        const product = await Product.findOne(find)

        // if(product.product_category_id){
        //     const category = await productCategory.findOne({
        //         _id : product.product_category_id,
        //         status : "active",
        //         deleted : false
        //     })

        //     product.category = category
        // }

        // product.priceNew = productHelper.priceNewProduct(product)
        res.render("client/pages/products/detail",{
            pageTitle : "Chi tiết sản phẩm",
            product : product
        })
    } catch (error) {
        
        res.redirect(`/products`)
    }
   
}