const mongoose = require("mongoose")
const ProfileSchema = mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
    },
    dob: {
        type: String,
    },
    occupation: {
        type: String,
    },
    workExperience: {
        type: String,
    },
    salary: {
        type: String,
    },
    currentfirm: {
        type: String
    },
    address: {
        type: String
    }
})

module.exports = mongoose.model("Profilemodel", ProfileSchema)
