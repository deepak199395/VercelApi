const mongoose = require('mongoose');

const CategoriesSchema= new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        description: {
            type: String
        },
        image: {
            type: String // image URL
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);
module.exports = mongoose.model("Categories", CategoriesSchema)