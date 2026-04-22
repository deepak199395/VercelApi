const mongoose = require('mongoose');

const  JuhiAuthSchema = new mongoose.Schema({
  FullName:{
    type:String,
    required:true,
    trim:true
  
  },
  phoneNumber:{
    type:Number,
    required:true,
    unique:true,
  },
  Email:{
    type:String,
    required:true,
    unique:true,
    trim:true
  },
  Password:{
    type:String,
    required:true,
    trim:true
  },
  age:{
    type:String,
    required:true,
    trim:true
  },
  
  
},
    { timestamps: true }

)
module.exports = mongoose.model("JuhiAuthModel",JuhiAuthSchema)
