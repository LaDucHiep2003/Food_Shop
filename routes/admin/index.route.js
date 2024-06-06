
const systemConfig = require('../../config/system')
const dashboardRouters = require('./dashboard.route')
const productdRouters = require('./product.route')
const productCategory = require("./product-category.route")
const roleCategory = require("./role.route")
const accountRouters = require("./account.route")
const authRouters = require("./auth.route")

module.exports = (app) =>{
    const PATH_ADMIN = systemConfig.prefixAdmin
    app.use(PATH_ADMIN + '/dashboard', dashboardRouters)
    app.use(PATH_ADMIN + '/products', productdRouters)
    app.use(PATH_ADMIN + '/products-category',productCategory)
    app.use(PATH_ADMIN + '/roles', roleCategory)
    app.use(PATH_ADMIN + '/accounts', accountRouters)
    app.use(PATH_ADMIN + '/auth', authRouters)
}