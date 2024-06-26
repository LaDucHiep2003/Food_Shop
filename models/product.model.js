const { default: mongoose } = require("mongoose");
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);
const productSchema = new mongoose.Schema(
    {
        title : String,
        description : String,
        price : Number,
        discountPercentage : Number,
        stock : Number,
        image : String,
        status : String,
        featured : String,
        position : Number,
        product_category_id : {
            type : String,
            default : ""
        },
        deleted : {
            type : Boolean,
            default : false
        },
        slug : {
            type : String,
            slug : "title",
            unique: true
        },
        
    },{
        timestamps : true
    }
)

const Product = mongoose.model('Product', productSchema, 'products')

module.exports = Product