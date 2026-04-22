const mongoose = require("mongoose");

const stackSchema = mongoose.Schema({
    stackName: {
        type: String,
    },
    stackDescription: {
        type: String,
    },
    expImage: {
        type: String,
    },
    expYear: {
        type: Number,
    }
})
module.exports = mongoose.model('Stack',stackSchema); 