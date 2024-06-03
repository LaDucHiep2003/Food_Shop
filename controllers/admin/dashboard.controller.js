


// [GET] /admin/dashboard
module.exports.dashboard = async (req, res) => {
    res.render("admin/pages/home/index",{
        pageTitle : "Trang tổng quan"
    })
}