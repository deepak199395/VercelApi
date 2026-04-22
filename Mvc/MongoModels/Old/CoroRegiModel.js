const mongoose = require("mongoose");
const CoroRegiModelSchema = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    password: {
        type: String,
    },
     gender: {
        type: String,
    },
    age: {
        type: Number,
    },
    citizenship: {
        type: String,
    },
    address: {
        type: String,
        required: true
    },
})
module.exports = mongoose.model("CoroRegiModel", CoroRegiModelSchema) 