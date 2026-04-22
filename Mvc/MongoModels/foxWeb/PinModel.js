const mongoose = require("mongoose");
const pinModelSchema = new mongoose.Schema({
    regiEmailId:{
        type: String,
        required: false,
    },
    EnterPin:{
         type: String,
         required: false,
    },
    confirmPin:{
        type: String,
        required: false,
    }
},{ timestamps: true })
module.exports=mongoose.model("PinModel",pinModelSchema)