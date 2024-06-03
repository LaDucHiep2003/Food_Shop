
const Product = require("../../models/product.model")
// [GET] /
module.exports.index = async (req, res) => {
    const product = await Product.find({deleted : false})
    res.render("client/pages/home/index",{
        product : product
    })
}