const mongoose =require("mongoose")

const bankModelSchema= mongoose.Schema({
    accnum:{
        type:String,
    },
    acctype:{
        type:String,
    },
    number:{
        type:Number,
        },
    email:{
        type:String,
    },
    emailadd:{
        type:String,
    }
})
module.exports=mongoose.model("Bankmodel",bankModelSchema)