const express = require('express')

const router = express.Router()
const controller = require('../../controllers/admin/product.controller')

const multer  = require('multer')
const upload = multer()
const validate = require('../../validates/admin/product.validate')

const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware")

router.get('/', controller.index)
router.patch('/change-status/:status/:id', controller.changeStatus)   
router.patch('/change-multi',controller.changeMulti) 
router.delete('/delete/:id',controller.deleteItem)   
router.get("/create",controller.create)
router.post("/create",
        upload.single('image'),
        uploadCloud.upload,
        validate.createPost,
        controller.createPost)

router.get("/edit/:id",controller.edit)
router.patch("/edit/:id",upload.single('image'),
uploadCloud.upload,controller.editPatch)

router.get("/detail/:id",controller.detail)
router.get("/deleted",controller.deleted)
router.delete('/deleted/:id',controller.deletedItem)   

module.exports = router;