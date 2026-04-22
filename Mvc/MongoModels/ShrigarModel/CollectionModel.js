const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema(
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
module.exports = mongoose.model("Collection", collectionSchema)