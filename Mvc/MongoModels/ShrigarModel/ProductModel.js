const mongoose = require('mongoose')
const productSchema = new mongoose.Schema(
    {
        collectionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Collection",
            required: true,
        },
        productName: {
            type: String,
            required: true,
            trim: true,
        },
        image: {
            type: String
        },

        description: {
            type: String,
            required: true,
        },
        originalPrice: {
            type: Number,
            required: true,
        },
        discountPercentage: {
            type: Number,
            required: true,
        },
        priceAfterDiscount: {
            type: Number,
            default: 0,
        },
         inStock: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
)
module.exports = mongoose.model("CollectionProduct", productSchema);