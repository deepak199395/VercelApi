const mongoose = require('mongoose');

// Define schema
const coroAuthRegisterSchema = new mongoose.Schema({
  fullName: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  phone: {
    type: String,
  },
  password: {
    type: String,
  },
  country: {
    type: String,
    default: '',
  },
  city: {
    type: String,
    default: '',
  },
  pincode: {
    type: String,
    default: '',
  },
  profilePhoto: {
    type: String,
    default: '',
  },
  role: {
    type: String,
    default: '',
  },
}, { timestamps: true });

// Export model
module.exports = mongoose.model('UserRegi', coroAuthRegisterSchema);
