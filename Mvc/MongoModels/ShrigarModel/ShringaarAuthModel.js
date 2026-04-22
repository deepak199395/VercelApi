const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    FullName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Dob:{
    type: String,
    required: true,
  
  },
  age: {
    type: Number,
    required: true,
  },
  Address: {
    type: String,
    required: true,
  },
  City: {
    type: String,
    required: true,
  },
  State: {
    type: String,
    required: true,
  },
  Pincode: {
    type: String,
    required: true,
  },
  Country: {
    type: String,
    required: true,
  },
  Gender: {
    type: String,
    required: true,
  },
  role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  isActive: {
    type: Boolean,
    default: true,
  },

}, { timestamps: true })
module.exports = mongoose.model("User", UserSchema)