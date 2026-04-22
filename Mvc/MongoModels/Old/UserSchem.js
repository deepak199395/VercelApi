const mongoose = require("mongoose")
// schemma
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is require']
    },
    lastname: {
        type: String,
        required: [true, 'lastname is require']
    },
    email: {
        type: String,
        required: [true, 'email is require'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password is require']
    },
    phone: {
        type: String,
        required: [true, 'phone is require']
    },
    role:{
        type:String,
        default:'user'
        
    }


}, { timestamps: true })
module.exports = mongoose.model('User',userSchema)
