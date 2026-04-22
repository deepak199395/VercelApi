const mongoose = require('mongoose');

const ExpessDiarySchema = new mongoose.Schema({
    name:{
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
    income:{
        type: Number,

    },
    bank:{
        type: String,
    },
    pan:{
        type: String,

    },
    limit:{
        type: Number,
    },
    folioNumber: {
        type: String,
    }

})
module.exports = mongoose.model('ExpessDiaryModel',ExpessDiarySchema);
