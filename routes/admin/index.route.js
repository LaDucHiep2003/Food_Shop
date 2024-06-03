
const systemConfig = require('../../config/system')
const dashboardRouters = require('./dashboard.route')
const productdRouters = require('./product.route')
const productCategory = require("./product-category.route")

module.exports = (app) =>{
    const PATH_ADMIN = systemConfig.prefixAdmin
    app.use(PATH_ADMIN + '/dashboard', dashboardRouters)
    app.use(PATH_ADMIN + '/products', productdRouters)
    app.use(PATH_ADMIN + '/products-category',productCategory)
}