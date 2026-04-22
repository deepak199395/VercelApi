const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    ProductNmae: {
        type: String,
        required: true
    },
    ProductDescription: {
        type: String,
        required: true
    },
    ProductPrice: {
        type: Number,
        required: true
    },
    ProductImage: {
        type: String,
        required: true
    },
    ProductCategory: {
        type: String,
        required: true
    },
},
    { timestamps: true }
)
module.exports = mongoose.model('Products',productSchema)
